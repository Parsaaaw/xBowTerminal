# xBow

A fast, lightweight, native terminal emulator for Windows, built with [Tauri](https://tauri.app) + Rust instead of Electron — for a fraction of the memory and startup time of most Electron-based terminals.

![platform](https://img.shields.io/badge/platform-Windows-blue)
![built with](https://img.shields.io/badge/built%20with-Tauri%202%20%2B%20Rust-orange)

## Why xBow

Most modern terminal apps ship an entire Chromium + Node.js runtime just to render text and manage a shell process. xBow uses Tauri's native WebView instead, so the whole app is a small, fast native binary — the UI is still HTML/CSS/JS (rendered with [xterm.js](https://xtermjs.org/)), but the backend (PTY handling, window management, settings) is plain Rust.

## Features

- **Multiple shells** — PowerShell, cmd, and WSL, each with its own tab accent color
- **Split panes** — split any pane horizontally or vertically, resize, and navigate between them with keyboard shortcuts
- **Tabs** — each tab can hold a single terminal or a tree of split panes
- **Command palette** — quick access to every action (`Ctrl+Shift+P`)
- **Scrollback search** — search within a pane's output (`Ctrl+Shift+F`)
- **10 built-in themes** — including Dark (default), macOS Pro, macOS Basic (Light), Dracula, Monokai, Gruvbox Dark, Catppuccin Mocha, Ayu Dark, Everforest Dark, and Iceberg Dark
- **Font choice** — JetBrains Mono, Fira Code, Cascadia Code, Consolas, Menlo/Monaco/SF Mono (macOS-style), and more, with adjustable font size
- **Fully rebindable keyboard shortcuts** for every action (new tab, split, close pane, navigate/resize panes, copy, zoom pane, etc.)
- **UTF-8 by default** — shells are launched with the correct codepage/encoding out of the box, so non-Latin text (e.g. Persian, Arabic, CJK) renders correctly instead of coming out garbled
- **Persistent settings** — default shell, theme, font, and key bindings are saved between sessions
- **Custom titlebar** with native-feeling window controls (minimize/maximize/close)

## Getting started

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain)
- [Tauri prerequisites for Windows](https://tauri.app/start/prerequisites/) (Microsoft C++ Build Tools + WebView2, which ships with Windows 10/11 by default)
- [Tauri CLI](https://tauri.app/reference/cli/):
  ```bash
  cargo install tauri-cli --version "^2"
  ```

### Run in development

```bash
git clone https://github.com/<your-username>/xbow.git
cd xbow
cargo tauri dev
```

### Build a release binary

```bash
cargo tauri build
```

The installer (NSIS) and the standalone executable will be generated under `src-tauri/target/release/`.

## Tech stack

| Layer | Technology |
|---|---|
| Shell / runtime | [Tauri 2](https://tauri.app) (Rust) |
| Terminal rendering | [xterm.js](https://xtermjs.org/) (with `addon-fit` and `addon-webgl`) |
| PTY handling | [`portable-pty`](https://crates.io/crates/portable-pty) |
| Frontend | Vanilla HTML/CSS/JavaScript (no framework, no bundler) |

## Project structure

```
xbow/
├── renderer/              # Frontend (the UI you see)
│   ├── index.html
│   ├── renderer.js        # App logic: tabs, panes, themes, shortcuts, settings UI
│   ├── styles.css
│   ├── tauri-shim.js       # Bridges the frontend to Tauri's IPC commands
│   └── vendor/             # xterm.js and its addons
└── src-tauri/              # Rust backend
    ├── src/main.rs          # PTY lifecycle, window controls, settings persistence
    ├── Cargo.toml
    ├── tauri.conf.json
    ├── capabilities/
    └── icons/
```

## Platform support

xBow currently targets **Windows** (PowerShell, cmd, and WSL are the supported shells, and the release profile/window controls are Windows-oriented). Linux/macOS support is not implemented yet, though the Rust/`portable-pty` core is cross-platform-friendly and contributions are welcome.

## Contributing

Issues and pull requests are welcome. If you're proposing a larger change (a new shell backend, a new platform target, etc.), please open an issue first to discuss the approach.

## License

No license has been specified yet. Add a `LICENSE` file (MIT, Apache-2.0, etc.) before treating this as open source.
