; Adds the Explorer right-click entries used to open xBow directly in a
; folder (see AppState.initial_path / find_folder_arg / the
; tauri-plugin-single-instance callback in main.rs, which is what actually
; consumes the path these pass in).
;
; Two separate keys because Explorer exposes two different right-click
; targets for "a folder":
;   - Directory\Background\shell  -> right-click on empty space *inside* a
;     folder window. Explorer expands %V to that folder's own path.
;   - Directory\shell             -> right-click directly *on* a folder icon
;     (in its parent's listing). Explorer expands %1 to that folder's path.
;
; HKCU (not HKLM) so this needs no elevation and applies per-user, matching
; how the rest of the installer/app already behaves.
!macro NSIS_HOOK_POSTINSTALL
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenXBow" "" "Open xBow"
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenXBow" "Icon" '"$INSTDIR\xbow.exe"'
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenXBow\command" "" '"$INSTDIR\xbow.exe" "%V"'

  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenXBow" "" "Open xBow here"
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenXBow" "Icon" '"$INSTDIR\xbow.exe"'
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenXBow\command" "" '"$INSTDIR\xbow.exe" "%1"'
!macroend

!macro NSIS_HOOK_PREUNINSTALL
  DeleteRegKey HKCU "Software\Classes\Directory\Background\shell\OpenXBow"
  DeleteRegKey HKCU "Software\Classes\Directory\shell\OpenXBow"
!macroend
