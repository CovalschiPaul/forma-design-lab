# FORMA design system

## Foundations

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F5F1E8` | Page and dialog background |
| Ink | `#242D36` | Text and primary actions |
| Muted | `#62676B` | Secondary descriptions |
| Ochre | `#EFB05B` | Hero artwork and accent |
| Line | `#D4D0C6` | Borders and separators |
| Radius | 6–16 px | Cards, controls, dialogs |

Body text uses locally available Arial/Helvetica/system sans-serif. Georgia adds an editorial accent to selected headlines. No font download is required. Main text is intentionally dark on light; decorative miniature interface labels are not a substitute for the readable interactive prototype.

## Layout

- Maximum content width: 1380 px, with 60 px desktop gutters.
- Tablet gutters: 30 px. Mobile gutters: 22 px.
- Breakpoints: 1000 px and 700 px; project and demo grids collapse to one column.
- Base spacing rhythm: 8, 16, 24, 32 px, with larger editorial section spacing.
- Wide catalog composition establishes depth; two adjacent concepts introduce contrast.

## Controls and behavior

Use native buttons for actions, links for navigation, radio buttons for exclusive choices, and selects for short filters. Every form control has a visible label. Filter buttons expose pressed state. Status messages use live regions. Native `dialog` provides modal focus containment and Escape dismissal; the opener regains focus on close. After list updates, focus stays on the corresponding item or moves to the relevant filter when that item disappears.

Visible focus is an explicit 3 px outline. Status is conveyed in text as well as color. Honor `prefers-reduced-motion`; scroll behavior becomes immediate. Mobile tables allow horizontal scrolling without expanding the document.

## Content principles

Short descriptive labels; specific feedback; reversible actions. Use “Demo bag” rather than implying a real purchase. Use “Reviewed” rather than implying a catalog defect was corrected. Identify fictional places and illustrative metrics clearly.

## Further validation

These foundations are not a claim of WCAG certification. Verify screen-reader announcements, zoom to 200–400%, contrast in all states, and touch targets on real devices before production use.

## Volume 02 — working-drawing direction

The hero uses three original folded planes on a measured grid. A keyboard-accessible “Show structure” control separates the planes and reveals their construction lines. Ochre, slate, and paper replace the original lime direction. Monospace annotations and squared frames connect the composition to a designer’s working archive. Motion is disabled under reduced-motion preferences.
