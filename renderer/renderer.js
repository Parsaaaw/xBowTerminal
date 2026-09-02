/* ---------------- shells & tab accents ---------------- */

const SHELL_META = {
  cmd: { label: "cmd", accent: "#f2c744" },
  powershell: { label: "PowerShell", accent: "#4aa3e0" },
  wsl: { label: "WSL", accent: "#e95420" },
};

/* ---------------- themes (incl. macOS-style palettes) ---------------- */

// Each theme has two color sets:
//  - `colors`: passed straight into xterm.js (term.options.theme) - only
//    affects the terminal grid itself (text/cursor/ansi colors).
//  - `chrome`: the app's own UI shell - titlebar, tabbar, settings panel,
//    body background - applied as CSS custom properties on :root by
//    applyChrome() below. These used to be hardcoded in styles.css, which
//    is why switching themes only ever recolored the terminal and left the
//    rest of the window looking the same regardless of theme.
const THEMES = {
  dark: {
    label: "Dark (Default)",
    type: "dark",
    colors: {
      background: "#14151f",
      foreground: "#f1f1f1",
      selectionBackground: "#3a3d5c",
    },
    chrome: {
      bg0: "#0b0c14", bg1: "#111219", bg2: "#15161f", bg3: "#14151f",
      text1: "#f1f1f1", text2: "#c5c8d6", text3: "#9a9db3", text4: "#7f849c",
      border1: "#22232f", border2: "#2a2b3a", border3: "#4a4b5a",
      accent: "#4aa3e0", accentHover: "#5cb3f0", accentText: "#0b0c14",
    },
  },
  "macos-pro": {
    label: "macOS Pro",
    type: "dark",
    colors: {
      background: "#1e1e1e",
      foreground: "#dcdcdc",
      selectionBackground: "#515151",
      black: "#1e1e1e",
      red: "#c9556f",
      green: "#8bc34a",
      yellow: "#d4d47a",
      blue: "#6a9fb5",
      magenta: "#b48ead",
      cyan: "#8abeb7",
      white: "#dcdcdc",
    },
    chrome: {
      bg0: "#1e1e1e", bg1: "#242424", bg2: "#2a2a2a", bg3: "#262626",
      text1: "#f0f0f0", text2: "#dcdcdc", text3: "#b0b0b0", text4: "#8a8a8a",
      border1: "#3a3a3a", border2: "#454545", border3: "#606060",
      accent: "#6a9fb5", accentHover: "#7db0c6", accentText: "#1a1a1a",
    },
  },
  "macos-basic-light": {
    label: "macOS Basic (Light)",
    type: "light",
    colors: {
      background: "#ffffff",
      foreground: "#1a1a1a",
      cursor: "#1a1a1a",
      selectionBackground: "#b5d5ff",
      black: "#1a1a1a",
      red: "#c41a15",
      green: "#00a600",
      yellow: "#998800",
      blue: "#0e4fa3",
      magenta: "#9a3e9a",
      cyan: "#0f8383",
      white: "#e0e0e0",
    },
    chrome: {
      bg0: "#ffffff", bg1: "#f5f5f5", bg2: "#ececec", bg3: "#f0f0f0",
      text1: "#1a1a1a", text2: "#333333", text3: "#5a5a5a", text4: "#7a7a7a",
      border1: "#d8d8d8", border2: "#c8c8c8", border3: "#a0a0a0",
      accent: "#0e4fa3", accentHover: "#1a63c4", accentText: "#ffffff",
    },
  },
  mono: {
    label: "Mono",
    type: "dark",
    colors: {
      background: "#0a0a0a",
      foreground: "#f0f0f0",
      cursor: "#888888",
      selectionBackground: "#1e1e1e",
    },
    chrome: {
      bg0: "#0a0a0a", bg1: "#050505", bg2: "#141414", bg3: "#1e1e1e",
      text1: "#f2f2f2", text2: "#f0f0f0", text3: "#8f8f8f", text4: "#616161",
      border1: "#141414", border2: "#1e1e1e", border3: "#474747",
      accent: "#888888", accentHover: "#9a9a9a", accentText: "#0a0a0a",
    },
  },
  dracula: {
    label: "Dracula",
    type: "dark",
    colors: {
      background: "#282a36",
      foreground: "#f8f8f2",
      selectionBackground: "#44475a",
      black: "#21222c",
      red: "#ff5555",
      green: "#50fa7b",
      yellow: "#f1fa8c",
      blue: "#bd93f9",
      magenta: "#ff79c6",
      cyan: "#8be9fd",
      white: "#f8f8f2",
    },
    chrome: {
      bg0: "#282a36", bg1: "#232430", bg2: "#21222c", bg3: "#262835",
      text1: "#f8f8f2", text2: "#e0e0f0", text3: "#bdbdd0", text4: "#8f90a6",
      border1: "#383a4a", border2: "#44475a", border3: "#6272a4",
      accent: "#bd93f9", accentHover: "#caa5fb", accentText: "#1e1f29",
    },
  },
  nord: {
    label: "Nord",
    type: "dark",
    colors: {
      background: "#2e3440",
      foreground: "#d8dee9",
      selectionBackground: "#434c5e",
      black: "#3b4252",
      red: "#bf616a",
      green: "#a3be8c",
      yellow: "#ebcb8b",
      blue: "#81a1c1",
      magenta: "#b48ead",
      cyan: "#88c0d0",
      white: "#e5e9f0",
    },
    chrome: {
      bg0: "#2e3440", bg1: "#2a303c", bg2: "#272c36", bg3: "#313745",
      text1: "#eceff4", text2: "#d8dee9", text3: "#b0b8c8", text4: "#8b93a5",
      border1: "#3b4252", border2: "#434c5e", border3: "#5e6779",
      accent: "#88c0d0", accentHover: "#9ad0e0", accentText: "#2e3440",
    },
  },
  "solarized-dark": {
    label: "Solarized Dark",
    type: "dark",
    colors: {
      background: "#002b36",
      foreground: "#839496",
      selectionBackground: "#073642",
      black: "#073642",
      red: "#dc322f",
      green: "#859900",
      yellow: "#b58900",
      blue: "#268bd2",
      magenta: "#d33682",
      cyan: "#2aa198",
      white: "#eee8d5",
    },
    chrome: {
      bg0: "#002b36", bg1: "#00252f", bg2: "#012029", bg3: "#013039",
      text1: "#eee8d5", text2: "#93a1a1", text3: "#839496", text4: "#657b83",
      border1: "#0a3a44", border2: "#0d4652", border3: "#155a68",
      accent: "#268bd2", accentHover: "#3ba0e8", accentText: "#00212b",
    },
  },
  gruvbox: {
    label: "Gruvbox Dark",
    type: "dark",
    colors: {
      background: "#282828",
      foreground: "#ebdbb2",
      cursor: "#ebdbb2",
      selectionBackground: "#3c3836",
      black: "#282828",
      red: "#cc241d",
      green: "#98971a",
      yellow: "#d79921",
      blue: "#458588",
      magenta: "#b16286",
      cyan: "#689d6a",
      white: "#a89984",
    },
    chrome: {
      bg0: "#282828", bg1: "#232323", bg2: "#32302f", bg3: "#3c3836",
      text1: "#ebdbb2", text2: "#d5c4a1", text3: "#a89984", text4: "#7c6f64",
      border1: "#3c3836", border2: "#504945", border3: "#665c54",
      accent: "#d79921", accentHover: "#e3a63a", accentText: "#282828",
    },
  },
  monokai: {
    label: "Monokai",
    type: "dark",
    colors: {
      background: "#272822",
      foreground: "#f8f8f2",
      cursor: "#f8f8f0",
      selectionBackground: "#49483e",
      black: "#272822",
      red: "#f92672",
      green: "#a6e22e",
      yellow: "#f4bf75",
      blue: "#66d9ef",
      magenta: "#ae81ff",
      cyan: "#a1efe4",
      white: "#f8f8f2",
    },
    chrome: {
      bg0: "#272822", bg1: "#222318", bg2: "#31322b", bg3: "#3e3d32",
      text1: "#f8f8f2", text2: "#e6e6df", text3: "#b3b2a9", text4: "#75715e",
      border1: "#3e3d32", border2: "#49483e", border3: "#75715e",
      accent: "#a6e22e", accentHover: "#b8ec4e", accentText: "#272822",
    },
  },
  "one-dark": {
    label: "One Dark",
    type: "dark",
    colors: {
      background: "#282c34",
      foreground: "#abb2bf",
      cursor: "#528bff",
      selectionBackground: "#3e4451",
      black: "#282c34",
      red: "#e06c75",
      green: "#98c379",
      yellow: "#e5c07b",
      blue: "#61afef",
      magenta: "#c678dd",
      cyan: "#56b6c2",
      white: "#abb2bf",
    },
    chrome: {
      bg0: "#282c34", bg1: "#21252b", bg2: "#2c313a", bg3: "#3e4451",
      text1: "#dbdfe6", text2: "#abb2bf", text3: "#828997", text4: "#5c6370",
      border1: "#3a3f4b", border2: "#3e4451", border3: "#5c6370",
      accent: "#61afef", accentHover: "#78bdf3", accentText: "#282c34",
    },
  },
  "tokyo-night": {
    label: "Tokyo Night",
    type: "dark",
    colors: {
      background: "#1a1b26",
      foreground: "#c0caf5",
      cursor: "#c0caf5",
      selectionBackground: "#33467c",
      black: "#15161e",
      red: "#f7768e",
      green: "#9ece6a",
      yellow: "#e0af68",
      blue: "#7aa2f7",
      magenta: "#bb9af7",
      cyan: "#7dcfff",
      white: "#a9b1d6",
    },
    chrome: {
      bg0: "#1a1b26", bg1: "#16161e", bg2: "#1f2335", bg3: "#24283b",
      text1: "#c0caf5", text2: "#a9b1d6", text3: "#787c99", text4: "#565a6e",
      border1: "#24283b", border2: "#2f3549", border3: "#414868",
      accent: "#7aa2f7", accentHover: "#8fb1f8", accentText: "#1a1b26",
    },
  },
  catppuccin: {
    label: "Catppuccin Mocha",
    type: "dark",
    colors: {
      background: "#1e1e2e",
      foreground: "#cdd6f4",
      cursor: "#f5e0dc",
      selectionBackground: "#414559",
      black: "#45475a",
      red: "#f38ba8",
      green: "#a6e3a1",
      yellow: "#f9e2af",
      blue: "#89b4fa",
      magenta: "#f5c2e7",
      cyan: "#94e2d5",
      white: "#bac2de",
    },
    chrome: {
      bg0: "#1e1e2e", bg1: "#181825", bg2: "#252537", bg3: "#313244",
      text1: "#cdd6f4", text2: "#bac2de", text3: "#9399b2", text4: "#6c7086",
      border1: "#313244", border2: "#45475a", border3: "#585b70",
      accent: "#89b4fa", accentHover: "#a0c4fb", accentText: "#1e1e2e",
    },
  },
  "ayu-dark": {
    label: "Ayu Dark",
    type: "dark",
    colors: {
      background: "#0a0e14",
      foreground: "#b3b1ad",
      cursor: "#e6b450",
      selectionBackground: "#273747",
      black: "#01060e",
      red: "#ea6c73",
      green: "#91b362",
      yellow: "#f9af4f",
      blue: "#53bdfa",
      magenta: "#fae994",
      cyan: "#90e1c6",
      white: "#c7c7c7",
    },
    chrome: {
      bg0: "#0a0e14", bg1: "#060a10", bg2: "#0d1219", bg3: "#131721",
      text1: "#e6e1cf", text2: "#b3b1ad", text3: "#828282", text4: "#4d5566",
      border1: "#131721", border2: "#1c212b", border3: "#3d4552",
      accent: "#e6b450", accentHover: "#edc373", accentText: "#0a0e14",
    },
  },
  "night-owl": {
    label: "Night Owl",
    type: "dark",
    colors: {
      background: "#011627",
      foreground: "#d6deeb",
      cursor: "#80a4c2",
      selectionBackground: "#1d3b53",
      black: "#011627",
      red: "#ef5350",
      green: "#addb67",
      yellow: "#ffeb95",
      blue: "#82aaff",
      magenta: "#c792ea",
      cyan: "#21c7a8",
      white: "#d6deeb",
    },
    chrome: {
      bg0: "#011627", bg1: "#010e1a", bg2: "#0b2942", bg3: "#1d3b53",
      text1: "#e6f1ff", text2: "#d6deeb", text3: "#8ba3bc", text4: "#5f7e97",
      border1: "#0b2942", border2: "#1d3b53", border3: "#3a5872",
      accent: "#82aaff", accentHover: "#9bb9ff", accentText: "#011627",
    },
  },
  synthwave: {
    label: "Synthwave '84",
    type: "dark",
    colors: {
      background: "#262335",
      foreground: "#f8f8f2",
      cursor: "#f92aad",
      selectionBackground: "#463465",
      black: "#262335",
      red: "#fe4450",
      green: "#72f1b8",
      yellow: "#fede5d",
      blue: "#03edf9",
      magenta: "#ff7edb",
      cyan: "#03edf9",
      white: "#f8f8f2",
    },
    chrome: {
      bg0: "#262335", bg1: "#1f1c2c", bg2: "#2d2a40", bg3: "#3a3352",
      text1: "#f8f8f2", text2: "#e0dcf5", text3: "#a99fc7", text4: "#736a94",
      border1: "#3a3352", border2: "#463465", border3: "#6e5a99",
      accent: "#ff7edb", accentHover: "#ff96e3", accentText: "#262335",
    },
  },
  palenight: {
    label: "Palenight",
    type: "dark",
    colors: {
      background: "#292d3e",
      foreground: "#a6accd",
      cursor: "#ffcc00",
      selectionBackground: "#3c4160",
      black: "#292d3e",
      red: "#f07178",
      green: "#c3e88d",
      yellow: "#ffcb6b",
      blue: "#82aaff",
      magenta: "#c792ea",
      cyan: "#89ddff",
      white: "#d0d0d0",
    },
    chrome: {
      bg0: "#292d3e", bg1: "#232635", bg2: "#323649", bg3: "#3c4160",
      text1: "#c5c9e0", text2: "#a6accd", text3: "#7d82a3", text4: "#565b78",
      border1: "#323649", border2: "#3c4160", border3: "#565b78",
      accent: "#c792ea", accentHover: "#d1a5ee", accentText: "#292d3e",
    },
  },
  everforest: {
    label: "Everforest Dark",
    type: "dark",
    colors: {
      background: "#2d353b",
      foreground: "#d3c6aa",
      cursor: "#d3c6aa",
      selectionBackground: "#475258",
      black: "#4b565c",
      red: "#e67e80",
      green: "#a7c080",
      yellow: "#dbbc7f",
      blue: "#7fbbb3",
      magenta: "#d699b6",
      cyan: "#83c092",
      white: "#d3c6aa",
    },
    chrome: {
      bg0: "#2d353b", bg1: "#272e33", bg2: "#343f44", bg3: "#3d484d",
      text1: "#d3c6aa", text2: "#c4b997", text3: "#9a9a85", text4: "#6a7377",
      border1: "#3d484d", border2: "#475258", border3: "#5f696d",
      accent: "#a7c080", accentHover: "#b8ce97", accentText: "#2d353b",
    },
  },
  jellybeans: {
    label: "Jellybeans",
    type: "dark",
    colors: {
      background: "#121212",
      foreground: "#dedede",
      cursor: "#ffa560",
      selectionBackground: "#474e91",
      black: "#929292",
      red: "#e27373",
      green: "#94b979",
      yellow: "#ffba7b",
      blue: "#97bedc",
      magenta: "#e1c0fa",
      cyan: "#00988e",
      white: "#dedede",
    },
    chrome: {
      bg0: "#121212", bg1: "#0d0d0d", bg2: "#1a1a1a", bg3: "#232323",
      text1: "#e8e8e8", text2: "#dedede", text3: "#a3a3a3", text4: "#767676",
      border1: "#232323", border2: "#2d2d2d", border3: "#4a4a4a",
      accent: "#97bedc", accentHover: "#aecce3", accentText: "#121212",
    },
  },
  deus: {
    label: "Deus",
    type: "dark",
    colors: {
      background: "#2c323b",
      foreground: "#eaeaea",
      cursor: "#c678dd",
      selectionBackground: "#3a4149",
      black: "#242a32",
      red: "#d54e53",
      green: "#98c379",
      yellow: "#e5c07b",
      blue: "#83a598",
      magenta: "#c678dd",
      cyan: "#70c0ba",
      white: "#eaeaea",
    },
    chrome: {
      bg0: "#2c323b", bg1: "#262b33", bg2: "#333a44", bg3: "#3a4149",
      text1: "#f0f0f0", text2: "#eaeaea", text3: "#a8adb4", text4: "#787e86",
      border1: "#3a4149", border2: "#454d57", border3: "#5c6570",
      accent: "#c678dd", accentHover: "#d090e5", accentText: "#2c323b",
    },
  },
  "github-dark": {
    label: "GitHub Dark",
    type: "dark",
    colors: {
      background: "#0d1117",
      foreground: "#c9d1d9",
      cursor: "#58a6ff",
      selectionBackground: "#163356",
      black: "#484f58",
      red: "#ff7b72",
      green: "#3fb950",
      yellow: "#d29922",
      blue: "#58a6ff",
      magenta: "#bc8cff",
      cyan: "#39c5cf",
      white: "#b1bac4",
    },
    chrome: {
      bg0: "#0d1117", bg1: "#010409", bg2: "#161b22", bg3: "#21262d",
      text1: "#e6edf3", text2: "#c9d1d9", text3: "#8b949e", text4: "#6e7681",
      border1: "#21262d", border2: "#30363d", border3: "#484f58",
      accent: "#58a6ff", accentHover: "#79b8ff", accentText: "#0d1117",
    },
  },
  "iceberg-dark": {
    label: "Iceberg Dark",
    type: "dark",
    colors: {
      background: "#161821",
      foreground: "#c6c8d1",
      cursor: "#c6c8d1",
      selectionBackground: "#272c42",
      black: "#1e2132",
      red: "#e27878",
      green: "#b4be82",
      yellow: "#e2a478",
      blue: "#84a0c6",
      magenta: "#a093c7",
      cyan: "#89b8c2",
      white: "#c6c8d1",
    },
    chrome: {
      bg0: "#161821", bg1: "#11121a", bg2: "#1e2132", bg3: "#272c42",
      text1: "#dcdfe7", text2: "#c6c8d1", text3: "#8389a3", text4: "#6b7089",
      border1: "#272c42", border2: "#33374c", border3: "#4b5170",
      accent: "#84a0c6", accentHover: "#9bb3d2", accentText: "#161821",
    },
  },
  "macos-homebrew": {
    label: "macOS Homebrew",
    type: "dark",
    colors: {
      background: "#000000",
      foreground: "#28c841",
      cursor: "#28c841",
      selectionBackground: "#0f4d1c",
    },
    chrome: {
      bg0: "#000000", bg1: "#050505", bg2: "#0a0a0a", bg3: "#070707",
      text1: "#3ee85a", text2: "#28c841", text3: "#1f9a34", text4: "#156622",
      border1: "#0f4d1c", border2: "#1c5a2c", border3: "#28c841",
      accent: "#28c841", accentHover: "#3ee85a", accentText: "#000000",
    },
  },
  // ---- Below: ported from promptpad's theme set (raminturne/promptpad,
  // src/themes.js). Palette hex values only - the "Pro"/"VIP" tiers there
  // are live visual effects (rain, CRT flicker, etc.), not just colors, so
  // they aren't portable to a plain terminal theme and were left out.
  forest: {
    label: "Forest",
    type: "dark",
    colors: {
      background: "#1B211A",
      foreground: "#D3DAD9",
      cursor: "#7fbf8b",
      selectionBackground: "#2a332a",
    },
    chrome: {
      bg0: "#1B211A", bg1: "#161b15", bg2: "#222a21", bg3: "#2a332a",
      text1: "#dae0df", text2: "#D3DAD9", text3: "#868c89", text4: "#616763",
      border1: "#222a21", border2: "#2a332a", border3: "#505850",
      accent: "#7fbf8b", accentHover: "#92c99c", accentText: "#1B211A",
    },
  },
  midnight: {
    label: "Midnight",
    type: "dark",
    colors: {
      background: "#0f1620",
      foreground: "#cdd6e3",
      cursor: "#5ea8e0",
      selectionBackground: "#1f2b3a",
    },
    chrome: {
      bg0: "#0f1620", bg1: "#0b121b", bg2: "#18222f", bg3: "#1f2b3a",
      text1: "#d5dce7", text2: "#cdd6e3", text3: "#7d8591", text4: "#575f6a",
      border1: "#18222f", border2: "#1f2b3a", border3: "#47515d",
      accent: "#5ea8e0", accentHover: "#76b5e5", accentText: "#0f1620",
    },
  },
  carbon: {
    label: "Carbon",
    type: "dark",
    colors: {
      background: "#161616",
      foreground: "#dad9d6",
      cursor: "#d9a566",
      selectionBackground: "#2a2a2a",
    },
    chrome: {
      bg0: "#161616", bg1: "#101010", bg2: "#202020", bg3: "#2a2a2a",
      text1: "#e0dfdc", text2: "#dad9d6", text3: "#888785", text4: "#60605f",
      border1: "#202020", border2: "#2a2a2a", border3: "#505050",
      accent: "#d9a566", accentHover: "#dfb37d", accentText: "#161616",
    },
  },
  plum: {
    label: "Plum",
    type: "dark",
    colors: {
      background: "#1a141f",
      foreground: "#e2d8e8",
      cursor: "#b88ad9",
      selectionBackground: "#2e2236",
    },
    chrome: {
      bg0: "#1a141f", bg1: "#150f1a", bg2: "#241a2b", bg3: "#2e2236",
      text1: "#e6deeb", text2: "#e2d8e8", text3: "#8e8694", text4: "#665e6b",
      border1: "#241a2b", border2: "#2e2236", border3: "#544a5a",
      accent: "#b88ad9", accentHover: "#c39cdf", accentText: "#1a141f",
    },
  },
  ember: {
    label: "Ember",
    type: "dark",
    colors: {
      background: "#1f1517",
      foreground: "#ecdad6",
      cursor: "#e0907a",
      selectionBackground: "#341f22",
    },
    chrome: {
      bg0: "#1f1517", bg1: "#190f11", bg2: "#2a1c1d", bg3: "#341f22",
      text1: "#efe0dc", text2: "#ecdad6", text3: "#968786", text4: "#6d6060",
      border1: "#2a1c1d", border2: "#341f22", border3: "#59474a",
      accent: "#e0907a", accentHover: "#e5a18e", accentText: "#1f1517",
    },
  },
  paper: {
    label: "Paper",
    type: "light",
    colors: {
      background: "#f7f7f5",
      foreground: "#1a1a1a",
      cursor: "#5472d4",
      selectionBackground: "#e8e6e4",
    },
    chrome: {
      bg0: "#f7f7f5", bg1: "#eeecea", bg2: "#ffffff", bg3: "#e8e6e4",
      text1: "#161616", text2: "#1a1a1a", text3: "#777776", text4: "#a3a3a2",
      border1: "#ffffff", border2: "#e8e6e4", border3: "#bebdbb",
      accent: "#5472d4", accentHover: "#6e87da", accentText: "#ffffff",
    },
  },
  sky: {
    label: "Sky",
    type: "light",
    colors: {
      background: "#e8f0fb",
      foreground: "#1a2540",
      cursor: "#2563eb",
      selectionBackground: "#ccddf5",
    },
    chrome: {
      bg0: "#e8f0fb", bg1: "#dce8f8", bg2: "#f2f7ff", bg3: "#ccddf5",
      text1: "#161f36", text2: "#1a2540", text3: "#717a8f", text4: "#9aa3b4",
      border1: "#f2f7ff", border2: "#ccddf5", border3: "#a7b5c9",
      accent: "#2563eb", accentHover: "#467aee", accentText: "#ffffff",
    },
  },
  sage: {
    label: "Sage",
    type: "light",
    colors: {
      background: "#eef5f0",
      foreground: "#182418",
      cursor: "#2d7a50",
      selectionBackground: "#d4e8da",
    },
    chrome: {
      bg0: "#eef5f0", bg1: "#e2ede6", bg2: "#f5faf6", bg3: "#d4e8da",
      text1: "#141f14", text2: "#182418", text3: "#727c73", text4: "#9da69e",
      border1: "#f5faf6", border2: "#d4e8da", border3: "#aebeb3",
      accent: "#2d7a50", accentHover: "#4d8e6a", accentText: "#ffffff",
    },
  },
  rose: {
    label: "Rose",
    type: "light",
    colors: {
      background: "#fdf0f4",
      foreground: "#2a1020",
      cursor: "#d0406a",
      selectionBackground: "#f0d4e0",
    },
    chrome: {
      bg0: "#fdf0f4", bg1: "#f8e4ec", bg2: "#fff5f8", bg3: "#f0d4e0",
      text1: "#240e1b", text2: "#2a1020", text3: "#836e79", text4: "#ad9ba3",
      border1: "#fff5f8", border2: "#f0d4e0", border3: "#c5aeb8",
      accent: "#d0406a", accentHover: "#d75d80", accentText: "#ffffff",
    },
  },
  latte: {
    label: "Latte",
    type: "light",
    colors: {
      background: "#f5ede0",
      foreground: "#2a1e10",
      cursor: "#b06030",
      selectionBackground: "#e4d8c8",
    },
    chrome: {
      bg0: "#f5ede0", bg1: "#ede3d4", bg2: "#fdf6ed", bg3: "#e4d8c8",
      text1: "#241a0e", text2: "#2a1e10", text3: "#7f7567", text4: "#a89e91",
      border1: "#fdf6ed", border2: "#e4d8c8", border3: "#bbb1a4",
      accent: "#b06030", accentHover: "#bc784f", accentText: "#ffffff",
    },
  },
  lavender: {
    label: "Lavender",
    type: "light",
    colors: {
      background: "#f0ecfa",
      foreground: "#1e1830",
      cursor: "#7050c0",
      selectionBackground: "#d8d0ee",
    },
    chrome: {
      bg0: "#f0ecfa", bg1: "#e6e0f5", bg2: "#f8f5ff", bg3: "#d8d0ee",
      text1: "#1a1429", text2: "#1e1830", text3: "#767185", text4: "#a09bad",
      border1: "#f8f5ff", border2: "#d8d0ee", border3: "#b1abc3",
      accent: "#7050c0", accentHover: "#856ac9", accentText: "#ffffff",
    },
  },
  snow: {
    label: "Snow",
    type: "light",
    colors: {
      background: "#ffffff",
      foreground: "#111111",
      cursor: "#333333",
      selectionBackground: "#e8e8e8",
    },
    chrome: {
      bg0: "#ffffff", bg1: "#f5f5f5", bg2: "#ffffff", bg3: "#e8e8e8",
      text1: "#0e0e0e", text2: "#111111", text3: "#757575", text4: "#a5a5a5",
      border1: "#ffffff", border2: "#e8e8e8", border3: "#bebebe",
      accent: "#333333", accentHover: "#525252", accentText: "#ffffff",
    },
  },
};

/* ---------------- fonts (incl. macOS system fonts) ---------------- */

// Tahoma and Segoe UI ship on every Windows install and both contain
// Persian/Arabic glyphs, so appending them as fallbacks means any font below
// still renders Persian text (via automatic per-character font substitution)
// instead of showing empty boxes, while Latin text keeps using the primary
// monospace font.
const PERSIAN_FALLBACK = ", Tahoma, 'Segoe UI'";

const FONTS = {
  jetbrains: { label: "JetBrains Mono", stack: "'JetBrains Mono', 'Fira Code', Menlo, monospace" + PERSIAN_FALLBACK },
  firacode: { label: "Fira Code", stack: "'Fira Code', Menlo, monospace" + PERSIAN_FALLBACK },
  cascadia: { label: "Cascadia Code", stack: "'Cascadia Code', Consolas, monospace" + PERSIAN_FALLBACK },
  consolas: { label: "Consolas", stack: "Consolas, 'Courier New', monospace" + PERSIAN_FALLBACK },
  menlo: { label: "Menlo (macOS)", stack: "Menlo, Monaco, 'Courier New', monospace" + PERSIAN_FALLBACK },
  monaco: { label: "Monaco (macOS)", stack: "Monaco, Menlo, 'Courier New', monospace" + PERSIAN_FALLBACK },
  sfmono: { label: "SF Mono (macOS)", stack: "'SF Mono', Menlo, Monaco, monospace" + PERSIAN_FALLBACK },
  tahoma: { label: "Tahoma (Persian + English)", stack: "Tahoma, 'Segoe UI', Consolas, monospace" },
};

/* ---------------- keyboard shortcuts (customizable) ---------------- */

// Each combo string is lowercase, "+"-joined, modifiers in ctrl/alt/shift
// order followed by the key - e.g. "ctrl+shift+d". Mirrors the format the
// Rust side stores verbatim in settings.json under keyBindings.
const DEFAULT_KEYBINDINGS = {
  newTab: "ctrl+shift+t",
  closePane: "ctrl+shift+w",
  splitRow: "ctrl+shift+d",
  splitCol: "ctrl+shift+e",
  search: "ctrl+shift+f",
  copy: "ctrl+shift+c",
  resizeLeft: "ctrl+shift+h",
  resizeRight: "ctrl+shift+l",
  resizeUp: "ctrl+shift+k",
  resizeDown: "ctrl+shift+j",
  navLeft: "ctrl+alt+h",
  navRight: "ctrl+alt+l",
  navUp: "ctrl+alt+k",
  navDown: "ctrl+alt+j",
  fontIncrease: "ctrl+shift+=",
  fontDecrease: "ctrl+shift+-",
  zoomPane: "ctrl+shift+z",
  commandPalette: "ctrl+shift+p",
  focusMode: "ctrl+shift+/",
};

// Display order + labels for the settings panel's shortcut list.
const SHORTCUT_ACTIONS = [
  { id: "newTab", label: "New tab (default shell)" },
  { id: "closePane", label: "Close active pane (closes tab if last pane)" },
  { id: "splitRow", label: "Split pane side-by-side" },
  { id: "splitCol", label: "Split pane stacked" },
  { id: "search", label: "Toggle scrollback search" },
  { id: "copy", label: "Copy selection" },
  { id: "resizeLeft", label: "Resize active pane left" },
  { id: "resizeRight", label: "Resize active pane right" },
  { id: "resizeUp", label: "Resize active pane up" },
  { id: "resizeDown", label: "Resize active pane down" },
  { id: "navLeft", label: "Move focus to pane on the left" },
  { id: "navRight", label: "Move focus to pane on the right" },
  { id: "navUp", label: "Move focus to pane above" },
  { id: "navDown", label: "Move focus to pane below" },
  { id: "fontIncrease", label: "Increase font size" },
  { id: "fontDecrease", label: "Decrease font size" },
  { id: "zoomPane", label: "Toggle zoom on active pane" },
  { id: "commandPalette", label: "Open command palette" },
  { id: "focusMode", label: "Toggle focus mode" },
];

const DEFAULT_SETTINGS = {
  defaultShell: "powershell",
  theme: "dark",
  fontFamily: "jetbrains",
  fontSize: 13,
  keyBindings: { ...DEFAULT_KEYBINDINGS },
  launchAtStartup: false,
  closeToTray: false,
};

let settings = { ...DEFAULT_SETTINGS };

/* ---------------- dom refs ---------------- */

const tabsEl = document.getElementById("tabs");
const panesEl = document.getElementById("panes");

let counter = 0;
// A "tab" can now contain more than one terminal (split panes), so the data
// model is two-level:
//   tabs:      tabId -> { id, tabEl, rootEl, panes: Map(paneId -> paneObj), activePaneId }
//   panesById: paneId -> paneObj  (flat lookup, since pty events only carry a paneId)
// paneObj: { id, tabId, shell, term, fitAddon, leafEl, container }
// `rootEl` is the tab's top-level `.pane` div (unchanged from before); its
// content is either a single `.split-leaf` (unsplit) or a tree of nested
// `.split-container` divs, each holding exactly [child, .split-resizer, child].
const tabs = new Map();
const panesById = new Map();
let activeTabId = null;

// Manual double-click detection for tab rename, instead of relying on the
// native 'dblclick' event. With draggable="true" on the tab, WebView2 (and
// Chromium in general) tends to interpret the second mousedown of a
// double-click - along with the tiny hand-tremor movement that naturally
// comes with it - as the start of a drag, which swallows the click sequence
// and means 'dblclick' never fires. Comparing timestamps on the ordinary
// 'click' event (which fires reliably even on draggable elements) sidesteps
// that entirely.
let lastTabClick = { tabId: null, time: 0 };
const DOUBLE_CLICK_MS = 400;

function genId() {
  return "term-" + ++counter;
}

/* ---------------- theme/font application ---------------- */

function themeForShell(shell, themeKey) {
  const base = (THEMES[themeKey] || THEMES.dark).colors;
  return {
    ...base,
    cursor: base.cursor || SHELL_META[shell].accent,
  };
}

// Pushes the selected theme's `chrome` palette onto :root as CSS custom
// properties. styles.css reads these via var(--bg-0) etc. for the titlebar,
// tabbar, settings panel, and body background - the parts of the window
// that are NOT the xterm grid itself (that part is themed separately via
// term.options.theme, see themeForShell/applyAppearance).
function applyChrome(themeKey) {
  const c = (THEMES[themeKey] || THEMES.dark).chrome;
  const root = document.documentElement.style;
  root.setProperty("--bg-0", c.bg0);
  root.setProperty("--bg-1", c.bg1);
  root.setProperty("--bg-2", c.bg2);
  root.setProperty("--bg-3", c.bg3);
  root.setProperty("--text-1", c.text1);
  root.setProperty("--text-2", c.text2);
  root.setProperty("--text-3", c.text3);
  root.setProperty("--text-4", c.text4);
  root.setProperty("--border-1", c.border1);
  root.setProperty("--border-2", c.border2);
  root.setProperty("--border-3", c.border3);
  root.setProperty("--accent", c.accent);
  root.setProperty("--accent-hover", c.accentHover);
  root.setProperty("--accent-text", c.accentText);
}

function applyAppearance() {
  applyChrome(settings.theme);
  const fontStack = (FONTS[settings.fontFamily] || FONTS.jetbrains).stack;
  for (const pane of panesById.values()) {
    pane.term.options.theme = themeForShell(pane.shell, settings.theme);
    pane.term.options.fontFamily = fontStack;
    pane.term.options.fontSize = settings.fontSize;
    // Hidden (display:none) tabs report 0 width/height for all their panes,
    // so fitting them here would compute bogus dimensions and send a broken
    // resize to that shell. Only panes in the visible tab need measuring now
    // — switchToTab() already re-fits every pane the moment its tab becomes
    // visible.
    if (pane.tabId === activeTabId) {
      pane.fitAddon.fit();
      window.api.resize(pane.id, pane.term.cols, pane.term.rows);
    }
  }
}

function changeFontSize(delta) {
  const next = Math.max(8, Math.min(32, settings.fontSize + delta));
  if (next === settings.fontSize) return;
  settings.fontSize = next;
  applyAppearance();
  window.api.setSettings(settings);
}

/* ---------------- clipboard / keyboard shortcuts ---------------- */

function copyActiveSelection() {
  const tab = tabs.get(activeTabId);
  const pane = tab && tab.panes.get(tab.activePaneId);
  if (!pane) return;
  const selection = pane.term.getSelection();
  if (selection) window.api.clipboardWriteText(selection);
}

// Maps a physical KeyboardEvent.code to the single-character label used in
// combo strings (DEFAULT_KEYBINDINGS only ever uses letters, digits, "="
// and "-"). .code reports the *physical* key position using its US-layout
// name (e.g. "KeyT") no matter what input language is active, unlike .key
// which reports whatever character that physical key produces under the
// current keyboard layout (e.g. a Persian letter instead of "t"). Returns
// null for codes outside that set so callers can fall back to .key.
const CODE_TO_COMBO_KEY = { Equal: "=", Minus: "-", Slash: "/" };
function comboKeyFromCode(code) {
  if (!code) return null;
  if (code in CODE_TO_COMBO_KEY) return CODE_TO_COMBO_KEY[code];
  let m = /^Key([A-Z])$/.exec(code);
  if (m) return m[1].toLowerCase();
  m = /^Digit([0-9])$/.exec(code);
  if (m) return m[1];
  return null;
}

// Turns a keydown event into the same "ctrl+alt+shift+key" combo string
// used in settings.keyBindings and the settings-panel recorder, or null if
// the event is a bare modifier press or has no modifier at all (plain keys
// are never eligible shortcuts - that would swallow normal shell input).
// The key portion is derived from e.code (physical key) rather than e.key
// (layout-dependent character) whenever possible, so shortcuts keep
// working the same regardless of the active keyboard language/layout -
// e.g. Ctrl+Shift+T still matches "ctrl+shift+t" even when the system
// keyboard is set to Persian and that physical key normally types "ت".
// "+" / "_" are normalized to "=" / "-" for the e.key fallback path, since
// on most layouts e.key already reports the shifted symbol rather than
// the physical key.
function comboFromEvent(e) {
  const rawKey = e.key.toLowerCase();
  if (["control", "alt", "shift", "meta", "os"].includes(rawKey)) return null;
  if (!e.ctrlKey && !e.altKey) return null;

  let key = comboKeyFromCode(e.code);
  if (!key) {
    key = rawKey;
    if (key === "+") key = "=";
    if (key === "_") key = "-";
  }

  const parts = [];
  if (e.ctrlKey) parts.push("ctrl");
  if (e.altKey) parts.push("alt");
  if (e.shiftKey) parts.push("shift");
  parts.push(key);
  return parts.join("+");
}

// action id -> handler. Keys match SHORTCUT_ACTIONS ids / DEFAULT_KEYBINDINGS
// keys, so the settings panel and this dispatch table never drift apart.
const ACTION_HANDLERS = {
  newTab: () => createTab(settings.defaultShell),
  closePane: () => closeActivePane(),
  splitRow: () => splitActivePane("row"),
  splitCol: () => splitActivePane("col"),
  search: () => toggleSearchBar(),
  copy: () => copyActiveSelection(),
  resizeLeft: () => resizeActivePane("row", -1),
  resizeRight: () => resizeActivePane("row", 1),
  resizeUp: () => resizeActivePane("col", -1),
  resizeDown: () => resizeActivePane("col", 1),
  navLeft: () => navigatePane("left"),
  navRight: () => navigatePane("right"),
  navUp: () => navigatePane("up"),
  navDown: () => navigatePane("down"),
  fontIncrease: () => changeFontSize(1),
  fontDecrease: () => changeFontSize(-1),
  zoomPane: () => toggleZoomActivePane(),
  commandPalette: () => togglePalette(),
  focusMode: () => setFocusMode(!document.body.classList.contains("focus-mode")),
};

// Registered per-terminal via term.attachCustomKeyEventHandler so shortcuts
// work while focus is inside any xterm instance, and returning false stops
// xterm from also treating the keystroke as terminal input. The actual key
// combos live in settings.keyBindings (editable from the settings panel,
// see the "Shortcuts" section below) rather than being hardcoded here.
function handleCustomKey(e) {
  if (e.type !== "keydown") return true;
  const combo = comboFromEvent(e);
  if (!combo) return true;

  const bindings = settings.keyBindings || DEFAULT_KEYBINDINGS;
  for (const action of Object.keys(bindings)) {
    if ((bindings[action] || "").toLowerCase() === combo) {
      const handler = ACTION_HANDLERS[action];
      if (!handler) continue;
      e.preventDefault();
      handler();
      return false;
    }
  }

  // xterm.js treats Ctrl+R as one of its own "browser-reserved" combos and
  // never turns it into terminal input, even though bash/zsh/fish all bind
  // it to reverse-history-search. Since the loop above found no app
  // shortcut claiming this combo (a user could still rebind something
  // else onto it, which is why this check comes last), forward the raw
  // control byte (0x12 / DC2) straight to the pty ourselves and tell
  // xterm to ignore the event entirely.
  if (combo === "ctrl+r") {
    const tab = tabs.get(activeTabId);
    const pane = tab && tab.panes.get(tab.activePaneId);
    if (pane) {
      e.preventDefault();
      window.api.input(pane.id, "\x12");
      return false;
    }
  }

  return true;
}

/* ---------------- clickable links ---------------- */

// Matches http(s) URLs on a single physical terminal row. Deliberately
// simple (no addon-web-links) - it won't stitch a URL that wraps across two
// rendered rows back together, but that covers the overwhelming majority of
// real output (ls, git, curl, stack traces, etc.).
const URL_REGEX = /https?:\/\/[^\s<>"'`]+/g;

function registerLinkProvider(term) {
  term.registerLinkProvider({
    provideLinks(bufferLineNumber, callback) {
      const line = term.buffer.active.getLine(bufferLineNumber - 1);
      if (!line) { callback(undefined); return; }

      const text = line.translateToString(true);
      const links = [];
      URL_REGEX.lastIndex = 0;
      let match;
      while ((match = URL_REGEX.exec(text)) !== null) {
        let url = match[0];
        // Strip common trailing punctuation that's usually not part of the
        // URL itself (end of sentence, closing paren/quote, etc.).
        const trailing = url.match(/[),.!?;:'"]+$/);
        if (trailing) url = url.slice(0, -trailing[0].length);
        if (!url) continue;

        const startX = match.index;
        links.push({
          text: url,
          range: {
            start: { x: startX + 1, y: bufferLineNumber },
            end: { x: startX + url.length, y: bufferLineNumber },
          },
          activate: () => window.api.openExternal(url),
          decorations: { pointerCursor: true, underline: true },
        });
      }
      callback(links.length ? links : undefined);
    },
  });
}

// xterm's default renderer draws every cell via the DOM, which gets slow
// under heavy/fast output or large scrollback. WebGL rendering is
// dramatically faster (GPU-accelerated). If WebGL isn't available (no GPU,
// context creation fails, etc.) this falls back to xterm's built-in DOM
// renderer - still fully functional, just not GPU-accelerated. (There's no
// stable @xterm/addon-canvas release compatible with @xterm/xterm 6.x yet,
// as of this writing, so Canvas isn't used as a middle fallback here.)
function loadFastRenderer(term) {
  try {
    const webgl = new WebglAddon.WebglAddon();
    // WebGL contexts can be lost (GPU driver reset, etc.) - dispose cleanly
    // rather than leaving a dead renderer attached.
    webgl.onContextLoss(() => webgl.dispose());
    term.loadAddon(webgl);
  } catch (_) {
    // WebGL unavailable - xterm's default DOM renderer is already active.
  }
}

/* ---------------- panes (leaves + split containers) ---------------- */

// Builds one terminal "leaf": the xterm mount point plus a small hover-only
// close button (only ever shown once the tab actually has multiple panes -
// see the .pane.has-splits rule in styles.css).
function makeLeafEl(paneId) {
  const leaf = document.createElement("div");
  leaf.className = "split-leaf";
  leaf.dataset.paneId = paneId;

  const container = document.createElement("div");
  container.className = "xterm-container";
  leaf.appendChild(container);

  const closeBtn = document.createElement("button");
  closeBtn.className = "pane-close-btn";
  closeBtn.textContent = "\u2715";
  closeBtn.title = "Close pane";
  closeBtn.addEventListener("mousedown", (e) => e.stopPropagation());
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const tab = tabs.get(activeTabId);
    if (tab) closePane(tab, paneId);
  });
  leaf.appendChild(closeBtn);

  return { leaf, container };
}

function updateHasSplitsClass(tab) {
  tab.rootEl.classList.toggle("has-splits", tab.panes.size > 1);
}

// Creates the terminal instance for a pane and wires it up exactly like the
// old single-terminal-per-tab createTab() used to, just parameterized over
// which tab/pane/DOM leaf it belongs to.
function spawnTerminalInLeaf(tab, paneId, shell, leafEl, container, cwd) {
  const term = new Terminal({
    cursorBlink: true,
    fontFamily: (FONTS[settings.fontFamily] || FONTS.jetbrains).stack,
    fontSize: settings.fontSize,
    theme: themeForShell(shell, settings.theme),
  });
  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.open(container);
  term.attachCustomKeyEventHandler(handleCustomKey);
  loadFastRenderer(term);
  registerLinkProvider(term);

  term.onData((data) => window.api.input(paneId, data));

  const pane = { id: paneId, tabId: tab.id, shell, term, fitAddon, leafEl, container };
  tab.panes.set(paneId, pane);
  panesById.set(paneId, pane);

  // xterm keeps a hidden textarea inside the leaf that actually receives
  // focus; 'focusin' bubbles up from it, so this is enough to detect "the
  // user clicked/tabbed into this pane" without patching xterm itself.
  leafEl.addEventListener("focusin", () => focusPane(tab, paneId));

  // Linux-style middle-click paste: reads the system clipboard and sends it
  // straight to the pty, same as a normal paste. preventDefault on the
  // mousedown (not click) is what stops Chromium's default middle-click
  // autoscroll cursor from appearing.
  leafEl.addEventListener("mousedown", async (e) => {
    if (e.button !== 1) return;
    e.preventDefault();
    focusPane(tab, paneId);
    try {
      const text = await window.api.clipboardReadText();
      if (text) window.api.input(paneId, text);
    } catch (_) {
      // No clipboard text, or the OS denied the read - nothing to paste.
    }
  });

  requestAnimationFrame(async () => {
    fitAddon.fit();
    await window.api.create(paneId, shell, term.cols, term.rows, cwd);
  });

  return pane;
}

function focusPane(tab, paneId) {
  if (tab.activePaneId && tab.panes.has(tab.activePaneId)) {
    tab.panes.get(tab.activePaneId).leafEl.classList.remove("pane-focused");
  }
  tab.activePaneId = paneId;
  const pane = tab.panes.get(paneId);
  if (!pane) return;
  pane.leafEl.classList.add("pane-focused");
  pane.term.focus();
}

// Recomputes every pane's terminal size within a tab. Needed whenever a tab
// becomes visible again (hidden tabs report 0x0 to any panes inside them)
// and after a split/resize/close changes the layout.
function fitAndResizeTabPanes(tab) {
  requestAnimationFrame(() => {
    for (const pane of tab.panes.values()) {
      pane.fitAddon.fit();
      window.api.resize(pane.id, pane.term.cols, pane.term.rows);
    }
    const active = tab.panes.get(tab.activePaneId);
    if (active) active.term.focus();
  });
}

function findLeavesUnder(el) {
  if (el.classList.contains("split-leaf")) return [el];
  return Array.from(el.querySelectorAll(".split-leaf"));
}

function fitPaneSubtree(tab, el) {
  for (const leafEl of findLeavesUnder(el)) {
    const pane = tab.panes.get(leafEl.dataset.paneId);
    if (pane) {
      pane.fitAddon.fit();
      window.api.resize(pane.id, pane.term.cols, pane.term.rows);
    }
  }
}

// Splits the active pane, replacing its leaf in the DOM with a
// [oldLeaf, resizer, newLeaf] split-container that takes over the old
// leaf's share of space. direction: 'row' = side-by-side (Ctrl+Shift+D),
// 'col' = stacked (Ctrl+Shift+E).
function splitActivePane(direction) {
  const tab = tabs.get(activeTabId);
  if (!tab) return;
  const pane = tab.panes.get(tab.activePaneId);
  if (!pane) return;

  const oldLeaf = pane.leafEl;
  const parent = oldLeaf.parentElement;

  const newPaneId = genId();
  const { leaf: newLeaf, container: newContainer } = makeLeafEl(newPaneId);

  const splitContainer = document.createElement("div");
  splitContainer.className = "split-container " + (direction === "row" ? "split-row" : "split-col");
  // The new container inherits whatever share of space oldLeaf used to have
  // in ITS parent; the two new children then split that 50/50.
  splitContainer.style.flex = oldLeaf.style.flex || "1 1 0%";
  oldLeaf.style.flex = "1 1 0%";
  newLeaf.style.flex = "1 1 0%";

  parent.replaceChild(splitContainer, oldLeaf);
  splitContainer.appendChild(oldLeaf);
  splitContainer.appendChild(makeResizerEl());
  splitContainer.appendChild(newLeaf);

  spawnTerminalInLeaf(tab, newPaneId, pane.shell, newLeaf, newContainer);
  wireResizer(tab, splitContainer);
  updateHasSplitsClass(tab);
  focusPane(tab, newPaneId);
  fitAndResizeTabPanes(tab);
}

function makeResizerEl() {
  const r = document.createElement("div");
  r.className = "split-resizer";
  return r;
}

// Drag-to-resize for the divider between a split-container's two children.
function wireResizer(tab, container) {
  const resizer = container.querySelector(":scope > .split-resizer");
  const isRow = container.classList.contains("split-row");
  let dragging = false;
  let a, b, startPos, startFlexA, startFlexB, containerSize, dragFrame;

  resizer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    dragging = true;
    resizer.classList.add("dragging");
    a = resizer.previousElementSibling;
    b = resizer.nextElementSibling;
    startPos = isRow ? e.clientX : e.clientY;
    startFlexA = parseFloat(a.style.flex) || 1;
    startFlexB = parseFloat(b.style.flex) || 1;
    const rect = container.getBoundingClientRect();
    containerSize = (isRow ? rect.width : rect.height) || 1;
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });

  function onMove(e) {
    if (!dragging) return;
    if (dragFrame) return;
    dragFrame = requestAnimationFrame(() => {
      dragFrame = null;
      const pos = isRow ? e.clientX : e.clientY;
      applySplit(pos);
    });
  }

  function applySplit(pos) {
    const total = startFlexA + startFlexB;
    const deltaFlex = ((pos - startPos) / containerSize) * total;
    let newA = startFlexA + deltaFlex;
    let newB = total - newA;
    const minFlex = total * 0.1;
    if (newA < minFlex) { newA = minFlex; newB = total - minFlex; }
    if (newB < minFlex) { newB = minFlex; newA = total - minFlex; }
    a.style.flex = `${newA} 1 0%`;
    b.style.flex = `${newB} 1 0%`;
    fitPaneSubtree(tab, a);
    fitPaneSubtree(tab, b);
  }

  function onUp() {
    dragging = false;
    resizer.classList.remove("dragging");
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  }
}

// Keyboard resize (Ctrl+Shift+H/J/K/L). axis 'row' = width (h shrinks, l
// grows), axis 'col' = height (k shrinks, j grows). Climbs up from the
// active pane to the nearest ancestor split-container whose orientation
// matches the requested axis and nudges the split there.
function resizeActivePane(axis, sign) {
  const tab = tabs.get(activeTabId);
  if (!tab) return;
  const pane = tab.panes.get(tab.activePaneId);
  if (!pane) return;

  let node = pane.leafEl;
  while (node && node !== tab.rootEl) {
    const parent = node.parentElement;
    if (parent && parent.classList.contains("split-container")) {
      const isRow = parent.classList.contains("split-row");
      if ((axis === "row" && isRow) || (axis === "col" && !isRow)) {
        const children = Array.from(parent.children).filter((c) => !c.classList.contains("split-resizer"));
        const idx = children.indexOf(node);
        const other = children[idx === 0 ? 1 : 0];
        const flexA = parseFloat(node.style.flex) || 1;
        const flexB = parseFloat(other.style.flex) || 1;
        const total = flexA + flexB;
        const step = total * 0.08;
        let newA = flexA + sign * step;
        let newB = total - newA;
        const minFlex = total * 0.1;
        if (newA < minFlex) { newA = minFlex; newB = total - minFlex; }
        if (newB < minFlex) { newB = minFlex; newA = total - minFlex; }
        node.style.flex = `${newA} 1 0%`;
        other.style.flex = `${newB} 1 0%`;
        fitPaneSubtree(tab, node);
        fitPaneSubtree(tab, other);
        return;
      }
    }
    node = parent;
  }
}

// Directional focus movement (Ctrl+Alt+H/J/K/L) by comparing the center
// point of every other pane's bounding box in the active tab.
function navigatePane(direction) {
  const tab = tabs.get(activeTabId);
  if (!tab || tab.panes.size < 2) return;
  const current = tab.panes.get(tab.activePaneId);
  if (!current) return;

  const curRect = current.leafEl.getBoundingClientRect();
  const cx = curRect.left + curRect.width / 2;
  const cy = curRect.top + curRect.height / 2;

  let best = null;
  let bestScore = Infinity;
  for (const pane of tab.panes.values()) {
    if (pane.id === current.id) continue;
    const r = pane.leafEl.getBoundingClientRect();
    const px = r.left + r.width / 2;
    const py = r.top + r.height / 2;
    let primary, secondary;
    if (direction === "left") { if (px >= cx - 1) continue; primary = cx - px; secondary = Math.abs(py - cy); }
    else if (direction === "right") { if (px <= cx + 1) continue; primary = px - cx; secondary = Math.abs(py - cy); }
    else if (direction === "up") { if (py >= cy - 1) continue; primary = cy - py; secondary = Math.abs(px - cx); }
    else { if (py <= cy + 1) continue; primary = py - cy; secondary = Math.abs(px - cx); }
    const score = primary + secondary * 2;
    if (score < bestScore) { bestScore = score; best = pane; }
  }
  if (best) focusPane(tab, best.id);
}

// Zoom (Ctrl+Shift+Z, tmux/iTerm-style): temporarily blows up the active
// pane to fill the whole tab without touching the split tree's actual
// structure or sizing.
//
// This used to be a pure CSS overlay: add position:absolute to the leaf
// in place and let it float over its siblings. That broke in practice
// because a nested split-leaf only has an *implicit* width/height (from
// flex), while a top-level (unsplit) leaf has an *explicit* one (from
// ".pane > .split-leaf { width:100%; height:100% }") - combined with
// position:absolute + inset:0, the explicit case is over-constrained and
// browsers resolve it against the positioned ancestor's padding-box
// instead of its content-box, so the leaf silently grew into .pane's 6px
// padding and shifted. On top of that, xterm's FitAddon only clears/
// redraws its canvas when cols/rows actually change (see addon-fit.js),
// so a purely-visual, sub-cell size change like that could leave the
// canvas stretched without a redraw - the cropped/shifted look reported
// in-app.
//
// Instead, actually move the leaf's DOM node out of the split tree and
// make it a plain, unnested child of the tab's root .pane - i.e. turn it
// into the exact same "unsplit leaf" case .split-leaf.zoomed's CSS
// already handles predictably, regardless of how deep the leaf used to
// be nested. A placeholder div left behind in the leaf's old spot keeps
// the split tree (and every other pane's flex share) completely
// unmodified, so put the real leaf right back on unzoom.
function toggleZoomActivePane() {
  const tab = tabs.get(activeTabId);
  if (!tab) return;

  if (tab.zoomedPaneId) {
    unzoomPane(tab);
    return;
  }

  const pane = tab.panes.get(tab.activePaneId);
  if (!pane) return;
  zoomPane(tab, pane);
}

function zoomPane(tab, pane) {
  const leaf = pane.leafEl;

  const placeholder = document.createElement("div");
  placeholder.className = "zoom-placeholder";
  placeholder.style.flex = leaf.style.flex || "1 1 0%";
  leaf.parentElement.replaceChild(placeholder, leaf);
  pane.zoomPlaceholder = placeholder;

  tab.rootEl.appendChild(leaf);
  leaf.classList.add("zoomed");
  tab.zoomedPaneId = pane.id;

  // Only the zoomed pane's own box actually changed - fitting/resizing
  // every other (still hidden) pane here as fitAndResizeTabPanes does
  // would send their ptys a resize to whatever size they happen to
  // reflow to underneath the overlay, which the user never sees and
  // which just gets undone on unzoom. That spurious SIGWINCH is what was
  // making full-screen apps (vim/htop/etc.) in other panes redraw/garble
  // while completely covered.
  requestAnimationFrame(() => {
    pane.fitAddon.fit();
    window.api.resize(pane.id, pane.term.cols, pane.term.rows);
    // Reparenting the leaf above (replaceChild + appendChild) blurs its
    // hidden xterm textarea if it held focus - the browser drops focus
    // whenever a focused element is moved to a new parent. The zoomed
    // leaf still *looks* focused (outline is unconditional in CSS), so
    // without this the terminal silently stops accepting input until the
    // user clicks it again. Re-focus explicitly to keep DOM focus in
    // sync with what's visually shown.
    focusPane(tab, pane.id);
  });
}

function unzoomPane(tab) {
  const pane = tab.panes.get(tab.zoomedPaneId);
  tab.zoomedPaneId = null;
  if (!pane || !pane.zoomPlaceholder) return;

  pane.leafEl.classList.remove("zoomed");
  pane.zoomPlaceholder.replaceWith(pane.leafEl);
  pane.zoomPlaceholder = null;

  requestAnimationFrame(() => {
    pane.fitAddon.fit();
    window.api.resize(pane.id, pane.term.cols, pane.term.rows);
    // Same reparenting-drops-focus issue as zoomPane() above - restore
    // focus after moving the leaf back into the split tree.
    focusPane(tab, pane.id);
  });
}

function closeActivePane() {
  const tab = tabs.get(activeTabId);
  if (!tab) return;
  closePane(tab, tab.activePaneId);
}

// Tears down one pane's terminal/pty and collapses its split-container back
// down to just the sibling that's left. If it was the tab's only pane, the
// whole tab closes instead (mirrors the old single-terminal-per-tab close
// behavior).
function closePane(tab, paneId) {
  const pane = tab.panes.get(paneId);
  if (!pane) return;

  window.api.kill(paneId);
  pane.term.dispose();
  tab.panes.delete(paneId);
  panesById.delete(paneId);

  if (tab.panes.size === 0) {
    closeTabById(tab.id);
    return;
  }

  // If this pane is currently zoomed, its leaf was moved out of the split
  // tree onto tab.rootEl (see zoomPane()) - the node still holding its
  // real spot is the placeholder left behind, not pane.leafEl itself.
  const isZoomed = tab.zoomedPaneId === paneId;
  if (isZoomed) {
    tab.zoomedPaneId = null;
    pane.leafEl.remove();
  }
  const leaf = isZoomed ? pane.zoomPlaceholder : pane.leafEl;

  const container = leaf.parentElement;
  if (container.classList.contains("split-container")) {
    const other = Array.from(container.children).find(
      (c) => c !== leaf && !c.classList.contains("split-resizer")
    );
    other.style.flex = container.style.flex || "1 1 0%";
    container.parentElement.replaceChild(other, container);
  } else {
    leaf.remove();
  }

  if (tab.activePaneId === paneId) {
    const nextPaneId = [...tab.panes.keys()][tab.panes.size - 1];
    focusPane(tab, nextPaneId);
  }
  updateHasSplitsClass(tab);
  fitAndResizeTabPanes(tab);
}

/* ---------------- tabs ---------------- */

// Swaps a tab's <span class="tab-label"> for a text <input>, commits the
// trimmed value on Enter/blur (falling back to the shell's default label if
// left empty), and restores the span on Escape/blur either way. Dragging is
// disabled for the duration so selecting text inside the input doesn't
// start a tab-reorder drag instead.
function startRenameTab(tab) {
  if (!tab) return;
  const labelEl = tab.tabEl.querySelector(".tab-label");
  if (!labelEl) return;

  tab.tabEl.draggable = false;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "tab-rename-input";
  input.maxLength = 40;
  input.value = tab.customName || labelEl.textContent;
  labelEl.replaceWith(input);
  input.focus();
  input.select();

  let done = false;
  function finish(newName) {
    if (done) return;
    done = true;
    tab.customName = newName || null;
    const span = document.createElement("span");
    span.className = "tab-label";
    span.textContent = tab.customName || SHELL_META[tab.shell].label;
    input.replaceWith(span);
    tab.tabEl.draggable = true;
  }

  input.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") { e.preventDefault(); finish(input.value.trim()); }
    else if (e.key === "Escape") { e.preventDefault(); finish(tab.customName); }
  });
  input.addEventListener("blur", () => finish(input.value.trim()));
  input.addEventListener("mousedown", (e) => e.stopPropagation());
  input.addEventListener("click", (e) => e.stopPropagation());
}

// Finds the tab element the dragged tab should be inserted before, based on
// horizontal mouse position - standard "closest midpoint" drag-reorder
// pattern. Returns null to mean "insert at the end".
function tabDragAfterElement(x) {
  const candidates = [...tabsEl.querySelectorAll(".tab:not(.dragging)")];
  return candidates.reduce(
    (closest, el) => {
      const box = el.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      return offset < 0 && offset > closest.offset ? { offset, element: el } : closest;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}

// The DOM order of .tab elements is the source of truth for display order;
// this re-syncs the `tabs` Map to match it after a drop, so anything that
// walks tabs.keys() (e.g. closeTabById's "switch to last tab") stays
// consistent with what the user sees.
function syncTabOrderFromDom() {
  const orderedIds = [...tabsEl.querySelectorAll(".tab")].map((el) => el.dataset.tabId);
  const snapshot = orderedIds.filter((id) => tabs.has(id)).map((id) => [id, tabs.get(id)]);
  tabs.clear();
  for (const [id, tab] of snapshot) tabs.set(id, tab);
}

tabsEl.addEventListener("dragenter", (e) => {
  if (tabsEl.querySelector(".tab.dragging")) e.preventDefault();
});

tabsEl.addEventListener("dragover", (e) => {
  const dragging = tabsEl.querySelector(".tab.dragging");
  if (!dragging) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  const afterEl = tabDragAfterElement(e.clientX);
  if (afterEl == null) tabsEl.appendChild(dragging);
  else tabsEl.insertBefore(dragging, afterEl);
});

tabsEl.addEventListener("drop", (e) => {
  if (tabsEl.querySelector(".tab.dragging")) e.preventDefault();
});

function createTab(shell, cwd) {
  const tabId = genId();

  // --- tab button ---
  const tabEl = document.createElement("div");
  tabEl.className = "tab";
  tabEl.draggable = true;
  tabEl.dataset.tabId = tabId;
  tabEl.innerHTML = `
    <span class="dot" style="background:${SHELL_META[shell].accent}"></span>
    <span class="tab-label">${SHELL_META[shell].label}</span>
    <span class="close">✕</span>
  `;
  tabEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) {
      closeTabById(tabId);
      return;
    }
    if (e.target.classList.contains("tab-rename-input")) return;

    const now = Date.now();
    if (lastTabClick.tabId === tabId && now - lastTabClick.time < DOUBLE_CLICK_MS) {
      lastTabClick = { tabId: null, time: 0 };
      startRenameTab(tabs.get(tabId));
      return;
    }
    lastTabClick = { tabId, time: now };
    switchToTab(tabId);
  });
  tabEl.addEventListener("dragstart", (e) => {
    tabEl.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", tabId);
  });
  tabEl.addEventListener("dragend", () => {
    tabEl.classList.remove("dragging");
    syncTabOrderFromDom();
  });
  tabsEl.appendChild(tabEl);

  // --- root pane area (starts as a single, unsplit leaf) ---
  const rootEl = document.createElement("div");
  rootEl.className = "pane";
  panesEl.appendChild(rootEl);

  const paneId = genId();
  const { leaf, container } = makeLeafEl(paneId);
  rootEl.appendChild(leaf);

  const tab = { id: tabId, tabEl, rootEl, panes: new Map(), activePaneId: paneId, shell, customName: null, zoomedPaneId: null };
  tabs.set(tabId, tab);

  spawnTerminalInLeaf(tab, paneId, shell, leaf, container, cwd);
  tab.activePaneId = paneId;

  switchToTab(tabId);

  return tabId;
}

function switchToTab(tabId) {
  if (activeTabId && tabs.has(activeTabId)) {
    tabs.get(activeTabId).tabEl.classList.remove("active");
    tabs.get(activeTabId).rootEl.classList.remove("active");
  }
  activeTabId = tabId;
  const tab = tabs.get(tabId);
  tab.tabEl.classList.add("active");
  tab.rootEl.classList.add("active");
  closeSearchBar();
  fitAndResizeTabPanes(tab);
}

function closeTabById(tabId) {
  const tab = tabs.get(tabId);
  if (!tab) return;
  for (const pane of tab.panes.values()) {
    window.api.kill(pane.id);
    pane.term.dispose();
    panesById.delete(pane.id);
  }
  tab.tabEl.remove();
  tab.rootEl.remove();
  tabs.delete(tabId);

  if (tabs.size === 0) {
    createTab(settings.defaultShell);
    return;
  }
  if (activeTabId === tabId) {
    switchToTab([...tabs.keys()][tabs.size - 1]);
  }
}

/* ---- pty output -> terminal ---- */
window.api.onData(({ id, data }) => {
  const pane = panesById.get(id);
  if (pane) pane.term.write(data);
});

// Fired when xBow is already running and a folder gets "Open xBow"'d again
// from Explorer - see tauri-plugin-single-instance's callback in main.rs,
// which relays the new launch's folder here instead of it opening a second
// window. A closed app instead picks the folder up itself at boot, via
// getInitialPath() below.
window.api.onOpenInFolder((path) => {
  if (path) createTab(settings.defaultShell, path);
});
window.api.onExit(({ id }) => {
  const pane = panesById.get(id);
  if (pane) pane.term.write("\r\n\x1b[90m[process exited]\x1b[0m\r\n");
});

/* ---- new-tab buttons ---- */
document.querySelectorAll(".new-tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => createTab(btn.dataset.shell));
});

/* ---- window controls ---- */
document.getElementById("btn-close").addEventListener("click", () => window.api.winClose());
document.getElementById("btn-min").addEventListener("click", () => window.api.winMinimize());
document.getElementById("btn-max").addEventListener("click", () => window.api.winMaximize());

/* ---- focus mode ---- */
// Hides the tab bar so the active terminal fills the window - a quick
// distraction-free toggle, not a persisted setting. Re-fitting the active
// tab's panes afterwards is required since #panes actually changes size
// (see the body.focus-mode rules in styles.css).
const btnFocus = document.getElementById("btn-focus");

function setFocusMode(on) {
  document.body.classList.toggle("focus-mode", on);
  btnFocus.classList.toggle("active", on);
  btnFocus.title = "Focus mode";
  const tab = tabs.get(activeTabId);
  if (tab) fitAndResizeTabPanes(tab);
}

btnFocus.addEventListener("click", () => {
  setFocusMode(!document.body.classList.contains("focus-mode"));
});

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    document.body.classList.contains("focus-mode") &&
    settingsOverlay.classList.contains("hidden") &&
    searchBar.classList.contains("hidden") &&
    paletteOverlay.classList.contains("hidden")
  ) {
    setFocusMode(false);
  }
});

/* ---- resize handling ---- */
// The native 'resize' event can fire far more often than the screen actually
// repaints while dragging a window edge. Coalescing to one fit()+IPC resize
// per animation frame (instead of one per event) avoids flooding the pty
// with redundant resize signals during a drag.
let resizeFrame = null;
window.addEventListener("resize", () => {
  if (resizeFrame) return;
  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = null;
    const tab = tabs.get(activeTabId);
    if (tab) fitAndResizeTabPanes(tab);
  });
});

/* ---------------- scrollback search ---------------- */

const searchBar = document.getElementById("search-bar");
const searchInput = document.getElementById("search-input");
const searchCountEl = document.getElementById("search-count");

let searchState = null; // { paneId, matches: [{row,col,len}], index }

function toggleSearchBar() {
  if (searchBar.classList.contains("hidden")) openSearchBar();
  else closeSearchBar();
}

function openSearchBar() {
  searchBar.classList.remove("hidden");
  searchInput.value = "";
  searchCountEl.textContent = "";
  searchState = null;
  searchInput.focus();
}

function closeSearchBar() {
  if (searchBar.classList.contains("hidden")) return;
  searchBar.classList.add("hidden");
  const tab = tabs.get(activeTabId);
  const pane = tab && tab.panes.get(tab.activePaneId);
  if (pane) {
    pane.term.clearSelection();
    pane.term.focus();
  }
  searchState = null;
}

function collectLines(term) {
  const buf = term.buffer.active;
  const lines = [];
  for (let y = 0; y < buf.length; y++) {
    const line = buf.getLine(y);
    lines.push(line ? line.translateToString(true) : "");
  }
  return lines;
}

function runSearch(query) {
  const tab = tabs.get(activeTabId);
  const pane = tab && tab.panes.get(tab.activePaneId);
  if (!pane || !query) {
    searchState = null;
    searchCountEl.textContent = query ? "0/0" : "";
    if (pane) pane.term.clearSelection();
    return;
  }

  const lines = collectLines(pane.term);
  const q = query.toLowerCase();
  const matches = [];
  for (let row = 0; row < lines.length; row++) {
    const lower = lines[row].toLowerCase();
    let from = 0;
    let idx;
    while ((idx = lower.indexOf(q, from)) !== -1) {
      matches.push({ row, col: idx, len: query.length });
      from = idx + q.length;
    }
  }

  searchState = { paneId: pane.id, matches, index: matches.length ? 0 : -1 };
  updateSearchCount();
  if (matches.length) jumpToMatch(pane.term, matches[0]);
  else pane.term.clearSelection();
}

function updateSearchCount() {
  if (!searchState || !searchState.matches.length) {
    searchCountEl.textContent = searchInput.value ? "0/0" : "";
    return;
  }
  searchCountEl.textContent = `${searchState.index + 1}/${searchState.matches.length}`;
}

function jumpToMatch(term, match) {
  term.select(match.col, match.row, match.len);
  term.scrollToLine(Math.max(0, match.row - Math.floor(term.rows / 2)));
}

function searchStep(delta) {
  if (!searchState || !searchState.matches.length) return;
  searchState.index = (searchState.index + delta + searchState.matches.length) % searchState.matches.length;
  updateSearchCount();
  const tab = tabs.get(activeTabId);
  const pane = tab && tab.panes.get(searchState.paneId);
  if (pane) jumpToMatch(pane.term, searchState.matches[searchState.index]);
}

searchInput.addEventListener("input", () => runSearch(searchInput.value));
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.shiftKey ? searchStep(-1) : searchStep(1);
  } else if (e.key === "Escape") {
    e.preventDefault();
    // See the matching note on the palette's Escape handler: without this,
    // the event bubbles to the document-level focus-mode handler after
    // closeSearchBar() has already hidden the bar, incorrectly exiting
    // focus mode too.
    e.stopPropagation();
    closeSearchBar();
  }
});
document.getElementById("search-prev").addEventListener("click", () => searchStep(-1));
document.getElementById("search-next").addEventListener("click", () => searchStep(1));
document.getElementById("search-close").addEventListener("click", closeSearchBar);

/* ---------------- settings panel ---------------- */

const settingsOverlay = document.getElementById("settings-overlay");
const settingsShellSel = document.getElementById("setting-shell");
const settingsFontSizeInput = document.getElementById("setting-fontsize");
const settingsLaunchAtStartup = document.getElementById("setting-launch-at-startup");
const settingsCloseToTray = document.getElementById("setting-close-to-tray");
const shortcutsListEl = document.getElementById("shortcuts-list");
const shortcutsResetAllBtn = document.getElementById("shortcuts-reset-all");
const themeGridDarkEl = document.getElementById("theme-grid-dark");
const themeGridLightEl = document.getElementById("theme-grid-light");
const fontGridEl = document.getElementById("font-grid");

// Working copies for the two grid-based pickers (theme/font), same idea as
// pendingKeyBindings below - mirrored into `settings` (and persisted to
// disk) immediately by commitSettings() every time one of them changes.
let pendingTheme = settings.theme;
let pendingFont = settings.fontFamily;

// Reads every field currently shown in the settings panel, applies it live,
// and persists it - called after every single change (shell pick, theme/
// font swatch click, font-size edit, shortcut rebind) so nothing needs an
// explicit Save step anymore.
async function commitSettings() {
  settings = {
    defaultShell: settingsShellSel.value,
    theme: pendingTheme,
    fontFamily: pendingFont,
    fontSize: Math.max(
      8,
      Math.min(32, parseInt(settingsFontSizeInput.value, 10) || DEFAULT_SETTINGS.fontSize)
    ),
    keyBindings: { ...pendingKeyBindings },
    launchAtStartup: settingsLaunchAtStartup.checked,
    closeToTray: settingsCloseToTray.checked,
  };
  applyAppearance();
  await window.api.setSettings(settings);
}

// Live-previews the pending font-size on the actual chrome and terminals
// while the person is still typing in the field, without writing to disk
// on every keystroke. commitSettings() (on "change") does the actual save.
function previewAppearance() {
  applyChrome(pendingTheme);
  const fontStack = (FONTS[pendingFont] || FONTS.jetbrains).stack;
  const previewSize = Math.max(
    8,
    Math.min(32, parseInt(settingsFontSizeInput.value, 10) || settings.fontSize)
  );
  for (const pane of panesById.values()) {
    pane.term.options.theme = themeForShell(pane.shell, pendingTheme);
    pane.term.options.fontFamily = fontStack;
    pane.term.options.fontSize = previewSize;
    if (pane.tabId === activeTabId) {
      pane.fitAddon.fit();
      window.api.resize(pane.id, pane.term.cols, pane.term.rows);
    }
  }
}

// Working copy of the key bindings while the settings panel is open. Every
// edit is immediately mirrored into `settings.keyBindings` and persisted via
// commitSettings(), same as the other fields.
let pendingKeyBindings = { ...DEFAULT_KEYBINDINGS };
let listeningAction = null; // action id currently waiting for a keypress, or null

function comboLabel(combo) {
  if (!combo) return "Unassigned";
  return combo
    .split("+")
    .map((p) => (p.length === 1 ? p.toUpperCase() : p.charAt(0).toUpperCase() + p.slice(1)))
    .join("+");
}

function renderShortcutsList() {
  const counts = {};
  for (const combo of Object.values(pendingKeyBindings)) {
    if (!combo) continue;
    counts[combo] = (counts[combo] || 0) + 1;
  }

  shortcutsListEl.innerHTML = "";
  for (const { id, label } of SHORTCUT_ACTIONS) {
    const combo = pendingKeyBindings[id] || "";
    const isListening = listeningAction === id;
    const isConflict = !isListening && combo && counts[combo] > 1;

    const row = document.createElement("div");
    row.className = "shortcut-row" + (isConflict ? " conflict" : "");

    const labelEl = document.createElement("span");
    labelEl.className = "shortcut-label";
    labelEl.textContent = label;

    const keyBtn = document.createElement("button");
    keyBtn.type = "button";
    keyBtn.className = "shortcut-key-btn" + (isListening ? " listening" : "");
    keyBtn.textContent = isListening ? "Press keys… (Esc to cancel)" : comboLabel(combo);
    keyBtn.addEventListener("click", () => startListeningFor(id));

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "shortcut-reset-btn";
    resetBtn.title = "Reset to default";
    resetBtn.textContent = "\u21BA";
    resetBtn.addEventListener("click", () => {
      pendingKeyBindings[id] = DEFAULT_KEYBINDINGS[id];
      if (listeningAction === id) stopListening();
      renderShortcutsList();
      commitSettings();
    });

    row.appendChild(labelEl);
    row.appendChild(keyBtn);
    row.appendChild(resetBtn);
    shortcutsListEl.appendChild(row);

    if (isConflict) {
      const warn = document.createElement("span");
      warn.className = "shortcut-conflict-hint";
      warn.textContent = "Also used elsewhere";
      row.appendChild(warn);
    }
  }
}

function onListenKeydown(e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.key === "Escape") {
    stopListening();
    renderShortcutsList();
    return;
  }
  const combo = comboFromEvent(e);
  if (!combo) return; // bare modifier or no modifier held - keep listening
  pendingKeyBindings[listeningAction] = combo;
  stopListening();
  renderShortcutsList();
  commitSettings();
}

function startListeningFor(action) {
  if (listeningAction) stopListening();
  listeningAction = action;
  // Capture-phase + only while the settings modal is open, so this never
  // interferes with the terminal's own attachCustomKeyEventHandler.
  document.addEventListener("keydown", onListenKeydown, true);
  renderShortcutsList();
}

function stopListening() {
  document.removeEventListener("keydown", onListenKeydown, true);
  listeningAction = null;
}

shortcutsResetAllBtn.addEventListener("click", () => {
  pendingKeyBindings = { ...DEFAULT_KEYBINDINGS };
  if (listeningAction) stopListening();
  renderShortcutsList();
  commitSettings();
});

// Builds one swatch group (Dark or Light) into the given grid element,
// filtering THEMES by `type`. Clicking a swatch just updates the pending
// selection and re-renders (to move the active outline) - nothing is
// applied to the live terminal until Save, same as every other field here.
function buildThemeGrid() {
  themeGridDarkEl.innerHTML = "";
  themeGridLightEl.innerHTML = "";
  for (const [key, t] of Object.entries(THEMES)) {
    const target = t.type === "light" ? themeGridLightEl : themeGridDarkEl;

    const item = document.createElement("button");
    item.type = "button";
    item.className = "theme-item";

    const swatch = document.createElement("span");
    swatch.className = "theme-swatch" + (key === pendingTheme ? " active" : "");
    swatch.style.background = t.chrome.bg0;

    const dot = document.createElement("span");
    dot.className = "sw-dot";
    dot.style.background = t.chrome.accent;
    swatch.appendChild(dot);

    const name = document.createElement("span");
    name.className = "theme-name";
    name.textContent = t.label;

    item.appendChild(swatch);
    item.appendChild(name);
    item.addEventListener("click", () => {
      pendingTheme = key;
      buildThemeGrid();
      commitSettings();
    });

    target.appendChild(item);
  }
}

function buildFontGrid() {
  fontGridEl.innerHTML = "";
  for (const [key, f] of Object.entries(FONTS)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "font-btn" + (key === pendingFont ? " active" : "");
    btn.textContent = f.label;
    btn.addEventListener("click", () => {
      pendingFont = key;
      buildFontGrid();
      commitSettings();
    });
    fontGridEl.appendChild(btn);
  }
}

/* ---- settings tabs (General / Appearance / Shortcuts) ---- */
function switchSettingsTab(tabId) {
  document.querySelectorAll(".settings-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
  document.querySelectorAll(".settings-tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.tabPanel === tabId);
  });
}
document.querySelectorAll(".settings-tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => switchSettingsTab(btn.dataset.tab));
});

function populateSettingsForm() {
  settingsShellSel.value = settings.defaultShell;
  settingsFontSizeInput.value = settings.fontSize;
  settingsLaunchAtStartup.checked = !!settings.launchAtStartup;
  settingsCloseToTray.checked = !!settings.closeToTray;

  pendingTheme = settings.theme;
  pendingFont = settings.fontFamily;
  buildThemeGrid();
  buildFontGrid();

  pendingKeyBindings = { ...DEFAULT_KEYBINDINGS, ...(settings.keyBindings || {}) };
  renderShortcutsList();

  switchSettingsTab("general");
}

function openSettings() {
  populateSettingsForm();
  settingsOverlay.classList.remove("hidden");
}

function closeSettings() {
  if (listeningAction) stopListening();
  // Nothing to revert anymore - every field commits (applies + persists)
  // the moment it changes, so `settings` is already up to date here.
  settingsOverlay.classList.add("hidden");
}

document.getElementById("btn-settings").addEventListener("click", openSettings);
document.getElementById("settings-cancel").addEventListener("click", closeSettings);
document.getElementById("settings-close-x").addEventListener("click", closeSettings);
settingsOverlay.addEventListener("click", (e) => {
  if (e.target === settingsOverlay) closeSettings();
});

// Font size: live-preview on every keystroke/spinner tick, but only persist
// to disk on "change" (blur, Enter, or a spinner click settling on a value)
// so typing "13" doesn't fire a save for the intermediate "1".
settingsFontSizeInput.addEventListener("input", previewAppearance);
settingsFontSizeInput.addEventListener("change", commitSettings);

settingsShellSel.addEventListener("change", commitSettings);
settingsLaunchAtStartup.addEventListener("change", commitSettings);
settingsCloseToTray.addEventListener("change", commitSettings);

/* ---------------- command palette ---------------- */

const paletteOverlay = document.getElementById("palette-overlay");
const paletteInput = document.getElementById("palette-input");
const paletteListEl = document.getElementById("palette-list");

let paletteCommands = [];
let paletteFiltered = [];
let paletteSelectedIndex = 0;

// These two intentionally do NOT go through commitSettings() - that
// function rebuilds the *entire* settings object from the settings-panel's
// DOM/pending state (pendingKeyBindings, settingsShellSel.value, etc.),
// which is only kept in sync while the panel is open. Calling it from here
// could silently reset custom keyBindings/defaultShell if the panel has
// never been opened this session. Mutating `settings` directly and saving
// (same pattern changeFontSize already uses above) is safe regardless.
function setThemeFromPalette(themeKey) {
  settings.theme = themeKey;
  applyAppearance();
  window.api.setSettings(settings);
}
function setFontFromPalette(fontKey) {
  settings.fontFamily = fontKey;
  applyAppearance();
  window.api.setSettings(settings);
}

// Rebuilt fresh every time the palette opens (rather than once at boot) so
// shortcut hints always reflect the current keyBindings.
function buildPaletteCommands() {
  const bindings = settings.keyBindings || DEFAULT_KEYBINDINGS;
  const cmds = [];

  for (const { id, label } of SHORTCUT_ACTIONS) {
    const handler = ACTION_HANDLERS[id];
    if (!handler) continue;
    cmds.push({ label, hint: comboLabel(bindings[id]), run: handler });
  }

  cmds.push(
    { label: "New Tab: cmd", run: () => createTab("cmd") },
    { label: "New Tab: PowerShell", run: () => createTab("powershell") },
    { label: "New Tab: WSL", run: () => createTab("wsl") },
    { label: "Open Settings", run: () => openSettings() }
  );

  for (const [key, t] of Object.entries(THEMES)) {
    cmds.push({ label: `Theme: ${t.label}`, run: () => setThemeFromPalette(key) });
  }
  for (const [key, f] of Object.entries(FONTS)) {
    cmds.push({ label: `Font: ${f.label}`, run: () => setFontFromPalette(key) });
  }

  return cmds;
}

// Simple "every typed word is a substring of the label" filter - no
// dependency, good enough for a few dozen commands.
function filterPaletteCommands(query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return paletteCommands;
  return paletteCommands.filter((cmd) => {
    const hay = cmd.label.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

function renderPaletteList() {
  paletteListEl.innerHTML = "";
  if (!paletteFiltered.length) {
    const empty = document.createElement("div");
    empty.className = "palette-empty";
    empty.textContent = "No matching commands";
    paletteListEl.appendChild(empty);
    return;
  }
  paletteFiltered.forEach((cmd, i) => {
    const item = document.createElement("div");
    item.className = "palette-item" + (i === paletteSelectedIndex ? " selected" : "");

    const labelEl = document.createElement("span");
    labelEl.textContent = cmd.label;
    item.appendChild(labelEl);

    if (cmd.hint && cmd.hint !== "Unassigned") {
      const hintEl = document.createElement("span");
      hintEl.className = "palette-item-hint";
      hintEl.textContent = cmd.hint;
      item.appendChild(hintEl);
    }

    // mousedown+preventDefault (not click) so clicking an item never steals
    // focus away from paletteInput first - same trick used for the pane
    // close button and tab-rename input elsewhere in this file.
    item.addEventListener("mousedown", (e) => {
      e.preventDefault();
      runPaletteCommand(i);
    });

    paletteListEl.appendChild(item);
  });

  // Keep the selected row visible when it's scrolled out of the viewport
  // (e.g. moving past the bottom of the visible list with ArrowDown/Up).
  const selectedEl = paletteListEl.children[paletteSelectedIndex];
  if (selectedEl) selectedEl.scrollIntoView({ block: "nearest" });
}

function runPaletteCommand(index) {
  const cmd = paletteFiltered[index];
  closePalette();
  if (cmd) cmd.run();
}

function openPalette() {
  paletteCommands = buildPaletteCommands();
  paletteFiltered = paletteCommands;
  paletteSelectedIndex = 0;
  paletteInput.value = "";
  paletteOverlay.classList.remove("hidden");
  renderPaletteList();
  paletteInput.focus();
}

function closePalette() {
  paletteOverlay.classList.add("hidden");
  // Without this, focus is left on the now-hidden paletteInput (which
  // becomes unfocusable via display:none), so keyboard input goes nowhere
  // until the user clicks back into a terminal. Same pattern as
  // closeSearchBar() below.
  const tab = tabs.get(activeTabId);
  const pane = tab && tab.panes.get(tab.activePaneId);
  if (pane) pane.term.focus();
}

// Guards against opening on top of the settings modal or search bar, same
// defensive pattern the existing focus-mode Escape handler below already
// uses for the same reason (keeps only one overlay meaningfully active).
function togglePalette() {
  if (!paletteOverlay.classList.contains("hidden")) {
    closePalette();
    return;
  }
  if (!settingsOverlay.classList.contains("hidden")) return;
  if (!searchBar.classList.contains("hidden")) return;
  openPalette();
}

paletteInput.addEventListener("input", () => {
  paletteFiltered = filterPaletteCommands(paletteInput.value);
  paletteSelectedIndex = 0;
  renderPaletteList();
});

paletteInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (paletteFiltered.length) paletteSelectedIndex = (paletteSelectedIndex + 1) % paletteFiltered.length;
    renderPaletteList();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (paletteFiltered.length) {
      paletteSelectedIndex = (paletteSelectedIndex - 1 + paletteFiltered.length) % paletteFiltered.length;
    }
    renderPaletteList();
  } else if (e.key === "Enter") {
    e.preventDefault();
    runPaletteCommand(paletteSelectedIndex);
  } else if (e.key === "Escape") {
    e.preventDefault();
    // Without this, the keydown bubbles up to the document-level focus-mode
    // Escape handler after closePalette() has already hidden paletteOverlay,
    // so that handler sees "no palette open" and exits focus mode too -
    // one Escape press would close both the palette and focus mode at once.
    e.stopPropagation();
    closePalette();
  }
});

paletteOverlay.addEventListener("click", (e) => {
  if (e.target === paletteOverlay) closePalette();
});

/* ---------------- boot ---------------- */

(async function boot() {
  try {
    settings = { ...DEFAULT_SETTINGS, ...(await window.api.getSettings()) };
  } catch (_) {
    settings = { ...DEFAULT_SETTINGS };
  }
  // Shallow-merge rather than a straight overwrite, so a settings.json saved
  // before a new shortcut action existed (or with an action missing) still
  // falls back to that action's default instead of leaving it unbound.
  settings.keyBindings = { ...DEFAULT_KEYBINDINGS, ...(settings.keyBindings || {}) };
  applyChrome(settings.theme);

  let initialPath = null;
  try {
    initialPath = await window.api.getInitialPath();
  } catch (_) {
    // No CLI/context-menu folder for this launch - normal startup.
  }
  createTab(settings.defaultShell, initialPath || undefined);
})();
