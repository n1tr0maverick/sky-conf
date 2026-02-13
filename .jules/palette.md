## 2024-05-22 - Retrofitting Keyboard A11y
**Learning:** Retrofitting keyboard accessibility on `div` buttons with inline `onclick` handlers is efficiently achieved by adding `role="button"`/`tabindex="0"` attributes and a single global `keydown` listener that triggers `click()`, preserving existing handler logic without rewriting JS.
**Action:** Use this pattern for legacy projects where converting to `<button>` elements would break styling or layout.
