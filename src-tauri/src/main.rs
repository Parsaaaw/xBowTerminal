// Without this, Windows builds this as a console-subsystem binary, which
// opens a visible cmd-style console window alongside the app on launch.
// That console then owns the process, so closing it kills the whole app
// too - which is exactly the symptom of a background terminal window
// appearing and closing it also closing Multi-Shell Terminal.
// Kept active in debug builds so `cargo tauri dev` still shows println!/
// eprintln! output and Rust panics in a console.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// This file is the Rust equivalent of main.js. Same responsibilities, one
// #[tauri::command] per old ipcMain handler:
//   pty:create/input/resize/kill  -> pty_create/pty_input/pty_resize/pty_kill
//   win:minimize/maximize/close   -> win_minimize/win_maximize/win_close
//   settings:get/set              -> settings_get/settings_set
//   clipboard:write               -> handled directly by the JS shim via the
//                                     clipboard-manager plugin (no Rust needed)
//
// The pty spawn/read/resize/kill logic below was compile-checked and run
// standalone against the real `portable-pty` crate before being wired into
// Tauri, since it's the highest-risk part of this rewrite.

use portable_pty::{native_pty_system, CommandBuilder, MasterPty, PtySize};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::io::{Read, Write};
use std::sync::Mutex;
use std::thread;
use std::time::Duration;
use tauri::{AppHandle, Emitter, Manager, State, Window};

struct PtyEntry {
    writer: Box<dyn Write + Send>,
    master: Box<dyn MasterPty + Send>,
}

struct AppState {
    ptys: Mutex<HashMap<String, PtyEntry>>,
}

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct PtyDataPayload {
    id: String,
    data: String,
}

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct PtyExitPayload {
    id: String,
    exit_code: i32,
}

// cmd.exe/powershell.exe default to a legacy codepage, not UTF-8, which is
// what makes non-Latin text (Persian, etc.) come out garbled even when the
// font has the glyphs. Switching to codepage 65001 on launch fixes decoding
// - same fix as SHELLS in the old main.js, ported as-is.
fn shell_config(shell: &str) -> (&'static str, Vec<&'static str>) {
    match shell {
        "cmd" => ("cmd.exe", vec!["/K", "chcp 65001>nul"]),
        "wsl" => ("wsl.exe", vec![]),
        _ => (
            "powershell.exe",
            vec![
                "-NoLogo",
                "-NoExit",
                "-Command",
                "chcp 65001 > $null; [Console]::OutputEncoding = [System.Text.Encoding]::UTF8; $OutputEncoding = [System.Text.Encoding]::UTF8",
            ],
        ),
    }
}

#[tauri::command]
fn pty_create(
    app: AppHandle,
    state: State<AppState>,
    id: String,
    shell: String,
    cols: u16,
    rows: u16,
) -> Result<(), String> {
    let pty_system = native_pty_system();
    let pair = pty_system
        .openpty(PtySize {
            rows: rows.max(1),
            cols: cols.max(1),
            pixel_width: 0,
            pixel_height: 0,
        })
        .map_err(|e| e.to_string())?;

    let (file, args) = shell_config(&shell);
    let mut cmd = CommandBuilder::new(file);
    cmd.args(args);
    if let Some(home) = dirs_next::home_dir() {
        cmd.cwd(home);
    }

    let mut child = pair.slave.spawn_command(cmd).map_err(|e| e.to_string())?;
    let writer = pair.master.take_writer().map_err(|e| e.to_string())?;
    let mut reader = pair.master.try_clone_reader().map_err(|e| e.to_string())?;

    state
        .ptys
        .lock()
        .unwrap()
        .insert(id.clone(), PtyEntry { writer, master: pair.master });

    // Reader thread: same intent as main.js's setImmediate-based batching -
    // coalesce a burst of output into one emitted event instead of one IPC
    // message per OS read(), which was the main source of lag under heavy
    // output (large `cat`, `dir /s`, npm installs, etc.).
    let app_reader = app.clone();
    let id_reader = id.clone();
    thread::spawn(move || {
        let mut buf = [0u8; 8192];
        let mut pending = String::new();
        loop {
            match reader.read(&mut buf) {
                Ok(0) => break,
                Ok(n) => {
                    pending.push_str(&String::from_utf8_lossy(&buf[..n]));
                    thread::sleep(Duration::from_millis(2));
                    let _ = app_reader.emit(
                        "pty:data",
                        PtyDataPayload { id: id_reader.clone(), data: std::mem::take(&mut pending) },
                    );
                }
                Err(_) => break,
            }
        }
    });

    // Exit watcher thread.
    let app_exit = app.clone();
    let id_exit = id.clone();
    thread::spawn(move || {
        let code = child.wait().map(|s| s.exit_code() as i32).unwrap_or(-1);
        let _ = app_exit.emit("pty:exit", PtyExitPayload { id: id_exit.clone(), exit_code: code });
        if let Some(state) = app_exit.try_state::<AppState>() {
            state.ptys.lock().unwrap().remove(&id_exit);
        }
    });

    Ok(())
}

#[tauri::command]
fn pty_input(state: State<AppState>, id: String, data: String) {
    if let Some(entry) = state.ptys.lock().unwrap().get_mut(&id) {
        let _ = entry.writer.write_all(data.as_bytes());
    }
}

#[tauri::command]
fn pty_resize(state: State<AppState>, id: String, cols: u16, rows: u16) {
    if let Some(entry) = state.ptys.lock().unwrap().get(&id) {
        let _ = entry.master.resize(PtySize {
            rows: rows.max(1),
            cols: cols.max(1),
            pixel_width: 0,
            pixel_height: 0,
        });
    }
}

#[tauri::command]
fn pty_kill(state: State<AppState>, id: String) {
    // Dropping the entry (writer + master) is enough to tear the pty down;
    // the exit-watcher thread's child.wait() unblocks and removes it too if
    // that hasn't already happened.
    state.ptys.lock().unwrap().remove(&id);
}

#[tauri::command]
fn app_ready(window: Window) {
    // visible:false in tauri.conf.json avoids main.js's old blank-frame
    // flash; the frontend calls this once its first paint is done.
    let _ = window.show();
}

#[tauri::command]
fn win_minimize(window: Window) {
    let _ = window.minimize();
}

#[tauri::command]
fn win_maximize(window: Window) {
    if window.is_maximized().unwrap_or(false) {
        let _ = window.unmaximize();
    } else {
        let _ = window.maximize();
    }
}

#[tauri::command]
fn win_close(window: Window) {
    let _ = window.close();
}

// Action name -> combo string, e.g. "newTab" -> "ctrl+shift+t". The combo
// format (lowercase, "+"-joined, modifier order ctrl/alt/shift then key) is
// shared with renderer.js's comboFromEvent()/comboLabel() - this side never
// parses or validates it, just stores whatever the frontend sends.
//
// #[serde(default = "default_key_bindings")] matters for upgrades: settings
// files written before this field existed have no "keyBindings" key, and
// without a per-field default serde would fail to deserialize the *whole*
// file (falling back to Settings::default() and silently discarding the
// user's saved shell/theme/font choices too).
fn default_key_bindings() -> HashMap<String, String> {
    let pairs: [(&str, &str); 18] = [
        ("newTab", "ctrl+shift+t"),
        ("closePane", "ctrl+shift+w"),
        ("splitRow", "ctrl+shift+d"),
        ("splitCol", "ctrl+shift+e"),
        ("search", "ctrl+shift+f"),
        ("copy", "ctrl+shift+c"),
        ("resizeLeft", "ctrl+shift+h"),
        ("resizeRight", "ctrl+shift+l"),
        ("resizeUp", "ctrl+shift+k"),
        ("resizeDown", "ctrl+shift+j"),
        ("navLeft", "ctrl+alt+h"),
        ("navRight", "ctrl+alt+l"),
        ("navUp", "ctrl+alt+k"),
        ("navDown", "ctrl+alt+j"),
        ("fontIncrease", "ctrl+shift+="),
        ("fontDecrease", "ctrl+shift+-"),
        ("zoomPane", "ctrl+shift+z"),
        ("commandPalette", "ctrl+shift+p"),
    ];
    pairs.into_iter().map(|(k, v)| (k.to_string(), v.to_string())).collect()
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
struct Settings {
    default_shell: String,
    theme: String,
    font_family: String,
    font_size: u32,
    #[serde(default = "default_key_bindings")]
    key_bindings: HashMap<String, String>,
}

impl Default for Settings {
    fn default() -> Self {
        Settings {
            default_shell: "powershell".into(),
            theme: "dark".into(),
            font_family: "jetbrains".into(),
            font_size: 13,
            key_bindings: default_key_bindings(),
        }
    }
}

fn settings_path(app: &AppHandle) -> std::path::PathBuf {
    let dir = app.path().app_data_dir().unwrap_or_default();
    let _ = std::fs::create_dir_all(&dir);
    dir.join("settings.json")
}

#[tauri::command]
fn settings_get(app: AppHandle) -> Settings {
    let path = settings_path(&app);
    std::fs::read_to_string(path)
        .ok()
        .and_then(|raw| serde_json::from_str(&raw).ok())
        .unwrap_or_default()
}

#[tauri::command]
fn settings_set(app: AppHandle, settings: Settings) -> Settings {
    let path = settings_path(&app);
    if let Ok(json) = serde_json::to_string_pretty(&settings) {
        let _ = std::fs::write(path, json);
    }
    settings
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_opener::init())
        .manage(AppState { ptys: Mutex::new(HashMap::new()) })
        .invoke_handler(tauri::generate_handler![
            pty_create,
            pty_input,
            pty_resize,
            pty_kill,
            app_ready,
            win_minimize,
            win_maximize,
            win_close,
            settings_get,
            settings_set,
        ])
        .on_window_event(|window, event| {
            // Equivalent of main.js's window-all-closed handler: kill every
            // live pty so no orphaned shell processes are left running.
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                if let Some(state) = window.app_handle().try_state::<AppState>() {
                    state.ptys.lock().unwrap().clear();
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
