## 2024-05-24 - Missing Focus Indicators (Keyboard Navigation)
**Learning:** The entire project lacked visible focus states (`:focus` or `:focus-visible`), meaning keyboard users navigating via Tab had no visual indication of their current position. This is a critical WCAG violation.
**Action:** Added a universal `:focus-visible` rule in `styles.css` utilizing the project's `--accent-primary` design token and a `4px` `outline-offset`. This ensures all interactive elements receive a consistent, brand-aligned focus ring without overriding mouse interaction styles.
