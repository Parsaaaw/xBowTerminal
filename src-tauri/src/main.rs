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
use tauri::menu::{Menu, MenuItem};
use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent};
use tauri::{AppHandle, Emitter, Manager, State, Window};
use tauri_plugin_autostart::{MacosLauncher, ManagerExt};

struct PtyEntry {
    writer: Box<dyn Write + Send>,
    master: Box<dyn MasterPty + Send>,
}

struct AppState {
    ptys: Mutex<HashMap<String, PtyEntry>>,
    // Set right before the tray's "Quit" item forces a real exit, so the
    // CloseRequested handler below knows to let it through instead of
    // reinterpreting it as an ordinary close-to-tray click.
    quitting: Mutex<bool>,
    // Folder path this process was launched with (from Explorer's "Open
    // xBow" / "Open xBow here" context menu, or a plain `xbow.exe <path>`
    // launch). Consumed once by get_initial_path() so the frontend opens
    // its very first tab there instead of the home directory.
    initial_path: Mutex<Option<String>>,
}

// Picks the first CLI argument that's an existing directory - used both for
// this process's own startup args and for a second instance's args relayed
// through the single-instance plugin below. Skips argv[0] (the exe path).
fn find_folder_arg<'a, I: IntoIterator<Item = &'a String>>(args: I) -> Option<String> {
    args.into_iter()
        .skip(1)
        .find(|a| std::path::Path::new(a).is_dir())
        .cloned()
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
    cwd: Option<String>,
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
    // Folder passed from Explorer's "Open xBow" context menu (or the
    // single-instance relay below) wins; otherwise fall back to $HOME like
    // before.
    let dir = cwd
        .filter(|d| std::path::Path::new(d).is_dir())
        .or_else(|| dirs_next::home_dir().map(|p| p.to_string_lossy().into_owned()));
    if let Some(dir) = dir {
        cmd.cwd(dir);
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
    // Both added for the General tab's two new toggles. #[serde(default)]
    // (defaulting to bool's own false) matters for upgrades, same reason as
    // key_bindings above: settings.json files written before these fields
    // existed have neither key, and without a default serde would fail to
    // deserialize the whole file.
    #[serde(default)]
    launch_at_startup: bool,
    #[serde(default)]
    close_to_tray: bool,
    // Added for the Appearance tab's "Selection opacity" slider. Without
    // #[serde(default = ...)] here, this struct has no field to hold the
    // value at all: settings_set deserializes the JS object straight into
    // Settings (silently dropping any key the struct doesn't declare) and
    // then re-serializes *that struct* to disk, so selectionOpacity was
    // never actually persisted to settings.json - every relaunch read it
    // back as whatever the frontend's own DEFAULT_SETTINGS fallback is (30).
    #[serde(default = "default_selection_opacity")]
    selection_opacity: u32,
}

fn default_selection_opacity() -> u32 {
    30
}

impl Default for Settings {
    fn default() -> Self {
        Settings {
            default_shell: "powershell".into(),
            theme: "dark".into(),
            font_family: "jetbrains".into(),
            font_size: 13,
            key_bindings: default_key_bindings(),
            launch_at_startup: false,
            close_to_tray: false,
            selection_opacity: default_selection_opacity(),
        }
    }
}

fn settings_path(app: &AppHandle) -> std::path::PathBuf {
    let dir = app.path().app_data_dir().unwrap_or_default();
    let _ = std::fs::create_dir_all(&dir);
    dir.join("settings.json")
}

// Shared by the settings_get command and the CloseRequested handler below,
// which needs to know the current close_to_tray value without going through
// invoke().
fn load_settings(app: &AppHandle) -> Settings {
    let path = settings_path(app);
    std::fs::read_to_string(path)
        .ok()
        .and_then(|raw| serde_json::from_str(&raw).ok())
        .unwrap_or_default()
}

#[tauri::command]
fn settings_get(app: AppHandle) -> Settings {
    load_settings(&app)
}

#[tauri::command]
fn settings_set(app: AppHandle, settings: Settings) -> Settings {
    let path = settings_path(&app);
    if let Ok(json) = serde_json::to_string_pretty(&settings) {
        let _ = std::fs::write(path, json);
    }

    // Keep the OS-level autostart registration in sync with the toggle
    // every time settings are saved, rather than requiring a separate
    // command from the frontend.
    let autolaunch = app.autolaunch();
    let is_enabled = autolaunch.is_enabled().unwrap_or(false);
    if settings.launch_at_startup && !is_enabled {
        let _ = autolaunch.enable();
    } else if !settings.launch_at_startup && is_enabled {
        let _ = autolaunch.disable();
    }

    settings
}

#[tauri::command]
fn get_initial_path(state: State<AppState>) -> Option<String> {
    // .take() so a page reload (or a second call for any reason) doesn't
    // reopen the same startup folder again - it's a one-shot "how was this
    // process launched" signal, not a persistent setting.
    state.initial_path.lock().unwrap().take()
}

fn main() {
    let initial_path = find_folder_arg(&std::env::args().collect::<Vec<_>>());

    tauri::Builder::default()
        // Must be registered before any other plugin (per its own docs): a
        // second `xbow.exe <folder>` launch - e.g. from Explorer's context
        // menu while xBow is already running - never reaches the rest of
        // this file. Instead this callback fires in the *existing* process
        // with the new launch's argv, and the second process exits on its
        // own right after.
        .plugin(tauri_plugin_single_instance::init(|app, argv, _cwd| {
            if let Some(path) = find_folder_arg(&argv) {
                let _ = app.emit("open-in-folder", path);
            }
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
                let _ = window.set_focus();
            }
        }))
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, None))
        .manage(AppState {
            ptys: Mutex::new(HashMap::new()),
            quitting: Mutex::new(false),
            initial_path: Mutex::new(initial_path),
        })
        .setup(|app| {
            // Tray icon + right-click menu, needed for the "Close to tray"
            // setting: once the window is hidden instead of closed, this is
            // the only way left to bring it back or actually quit.
            let show_item = MenuItem::with_id(app, "show", "Open xBow", true, None::<&str>)?;
            let quit_item = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let tray_menu = Menu::with_items(app, &[&show_item, &quit_item])?;

            let mut tray_builder = TrayIconBuilder::new()
                .tooltip("xBow")
                .menu(&tray_menu)
                .show_menu_on_left_click(false)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "show" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    "quit" => {
                        if let Some(state) = app.try_state::<AppState>() {
                            *state.quitting.lock().unwrap() = true;
                            // Same pty cleanup the normal close path does -
                            // app.exit() below skips CloseRequested entirely.
                            state.ptys.lock().unwrap().clear();
                        }
                        app.exit(0);
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                });
            if let Some(icon) = app.default_window_icon() {
                tray_builder = tray_builder.icon(icon.clone());
            }
            tray_builder.build(app)?;

            Ok(())
        })
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
            get_initial_path,
        ])
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                let app_handle = window.app_handle();

                // "Quit" from the tray sets this right before calling
                // app.exit(), so a real quit is never reinterpreted as a
                // close-to-tray click even when close_to_tray is on.
                let quitting = app_handle
                    .try_state::<AppState>()
                    .map(|s| *s.quitting.lock().unwrap())
                    .unwrap_or(false);

                if !quitting && load_settings(app_handle).close_to_tray {
                    api.prevent_close();
                    let _ = window.hide();
                    return;
                }

                // Equivalent of main.js's window-all-closed handler: kill
                // every live pty so no orphaned shell processes are left
                // running.
                if let Some(state) = app_handle.try_state::<AppState>() {
                    state.ptys.lock().unwrap().clear();
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
