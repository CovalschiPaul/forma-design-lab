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

See the final repository commit notes for checks actually performed. Unchecked items above are a reusable checklist, not a claim that validation occurred.
