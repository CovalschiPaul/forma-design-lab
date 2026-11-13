# QA and acceptance checklist

## Reproduce locally

Open `index.html` or run `python -m http.server 8000`. Use a current Chrome, Firefox, or Safari. No network calls are required by the application itself.

## Core checks

- [ ] All project filters show the expected cards and update pressed state.
- [ ] Each prototype and case study opens with a named dialog; Escape and Close dismiss it.
- [ ] Focus remains inside an open modal and returns to its opener afterward.
- [ ] Clear: search `chair`; filter Reviewed; mark a review; undo; reset; try a nonexistent search.
- [ ] Still: select all finishes; choose two chairs; confirm €498; add; clear bag.
- [ ] Offgrid: select Outdoors; save the riverside path; select Saved; unsave; verify empty state.
- [ ] Case-study prototype buttons open the corresponding demo.
- [ ] Verify 390 px, 768 px, and 1440 px layouts without page-level horizontal overflow.
- [ ] Verify keyboard-only navigation and 200% browser zoom.
- [ ] Verify VoiceOver or NVDA announcements and reduced-motion preferences.
- [ ] Confirm external GitHub links resolve.

## Known limits

Miniature previews are visual compositions. Use their prototype buttons for readable, functional interfaces. All demo state is in memory; reloading resets it. No persistence, analytics, account, or production services exist. The native dialog implementation targets current browsers.

## Verification record

Verified on 14 November 2026 in desktop Chromium against the deployed GitHub Pages site:

- JavaScript syntax check passed; static IDs are unique and local assets exist.
- Catalog search, review action, undo, and no-results message passed.
- Walnut finish selection updated the accessible product description.
- Two chairs calculated €498; adding reported two walnut chairs; emptying reset the bag.
- Outdoors filtering, saving, saved-only view, unsaving, and empty-state recovery copy passed.
- E-commerce project filter showed one project; All restored three.
- Case study opened the corresponding prototype; Escape dismissed the dialog.
- Desktop hero composition visually inspected; preview image captured.

Mobile/real-device, screen-reader, zoom, and full cross-browser validation remain pending. The reusable checklist above intentionally remains unchecked to support a complete future QA pass.
