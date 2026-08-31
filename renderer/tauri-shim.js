// Tauri equivalent of preload.js. Electron's contextBridge doesn't exist
// here, but the effect is the same: renderer.js only ever talks to
// `window.api`, and this file is the only thing that knows it's now backed
// by Tauri's invoke()/listen() instead of ipcRenderer. renderer.js itself
// is unchanged.
(function () {
  const { invoke } = window.__TAURI__.core;
  const { listen } = window.__TAURI__.event;
  const { writeText, readText } = window.__TAURI__.clipboardManager;

  window.api = {
    create: (id, shell, cols, rows) => invoke("pty_create", { id, shell, cols, rows }),
    input: (id, data) => invoke("pty_input", { id, data }),
    resize: (id, cols, rows) => invoke("pty_resize", { id, cols, rows }),
    kill: (id) => invoke("pty_kill", { id }),
    onData: (cb) => listen("pty:data", (event) => cb(event.payload)),
    onExit: (cb) => listen("pty:exit", (event) => cb(event.payload)),

    winMinimize: () => invoke("win_minimize"),
    winMaximize: () => invoke("win_maximize"),
    winClose: () => invoke("win_close"),

    // Rust's Settings struct uses snake_case internally but is serialized
    // as camelCase (#[serde(rename_all = "camelCase")]), so the JSON shape
    // renderer.js already expects (defaultShell/fontFamily/fontSize) is
    // unchanged on the wire.
    getSettings: () => invoke("settings_get"),
    setSettings: (settings) => invoke("settings_set", { settings }),

    clipboardWriteText: (text) => writeText(text || ""),
    clipboardReadText: () => readText(),

    // Opens a URL in the user's default system browser. Invoked directly by
    // plugin command name (rather than via a window.__TAURI__.opener global)
    // so this doesn't depend on whether that plugin's JS glue got bundled -
    // the invoke() channel to a registered plugin command always works as
    // long as the capability below grants it.
    openExternal: (url) => invoke("plugin:opener|open_url", { url }),
  };

  // Old main.js showed the window on Electron's "ready-to-show" to avoid a
  // blank-frame flash; tauri.conf.json sets visible:false for the same
  // reason, and this tells Rust it's now safe to show it.
  window.addEventListener("DOMContentLoaded", () => invoke("app_ready"));
})();

// ---------------------------------------------------------------------
// Lock down the underlying WebView's own "browser chrome" behavior
// (right-click "Inspect" menu, F12/devtools, Ctrl+R/F5 reload, etc.).
// This is a completely separate, self-contained block from the shim
// above and from renderer.js - it never touches window.api, never
// touches settings.keyBindings/handleCustomKey/ACTION_HANDLERS, and it
// never calls stopPropagation()/stopImmediatePropagation(). It only
// calls preventDefault() on the browser's *native* reaction to a small,
// fixed set of keys, so the event still propagates completely normally
// to every existing listener afterwards (document keydown handler,
// xterm's attachCustomKeyEventHandler, etc.) - including combos that
// renderer.js already reuses for its own shortcuts, e.g. the default
// Ctrl+Shift+C binding for "copy" (which is also Chrome's inspect-
// element-picker shortcut): the native picker no longer opens, but the
// app's own copy handler still fires exactly as before.
(function () {
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  // Note: xterm.js already treats Ctrl+R as a "browser-reserved" key on
  // its own and never forwards it to the pty, so this only stops the
  // WebView from reloading on Ctrl+R - it does not by itself restore
  // bash-style reverse-history-search. Ask if you also want that wired
  // through to the pty.
  const RESERVED_BROWSER_COMBOS = new Set([
    "f5", "ctrl+r", "ctrl+shift+r",
    "f12", "ctrl+shift+i", "ctrl+shift+j", "ctrl+shift+c", "ctrl+u",
  ]);

  // Derives the combo's key portion from the physical key (KeyboardEvent
  // .code, e.g. "KeyR") instead of the character it produces (.key). .key
  // depends on the active input language/layout - on a Persian layout the
  // physical R key reports .key as a Persian letter, not "r" - so matching
  // on .key alone would silently stop catching Ctrl+Shift+R (or any other
  // entry above) the moment the system keyboard isn't English. .code is
  // always the same physical-position label regardless of layout, so this
  // keeps working no matter what language is active.
  function comboKeyFromCode(code) {
    if (!code) return null;
    const m = /^Key([A-Z])$/.exec(code);
    return m ? m[1].toLowerCase() : code.toLowerCase(); // F5, F12, etc.
  }

  window.addEventListener(
    "keydown",
    (e) => {
      const parts = [];
      if (e.ctrlKey) parts.push("ctrl");
      if (e.shiftKey) parts.push("shift");
      parts.push(comboKeyFromCode(e.code) || e.key.toLowerCase());
      if (RESERVED_BROWSER_COMBOS.has(parts.join("+"))) e.preventDefault();
    },
    true // capture phase: run as early as possible, before anything else sees it
  );
})();
