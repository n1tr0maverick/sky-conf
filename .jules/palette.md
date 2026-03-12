## 2024-05-17 - Focus Visible Styles
**Learning:** Accessibility focus indicators (`:focus-visible`) for this project use `outline: 2px solid var(--accent-primary)` with `outline-offset: 4px`. The focus styles are completely missing from styles.css, hindering keyboard navigation accessibility.
**Action:** Add `:focus-visible` styles with `outline: 2px solid var(--accent-primary)` and `outline-offset: 4px` to interactive elements (buttons, links, inputs).
