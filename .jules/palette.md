## 2026-02-07 - Interactive Div Accessibility Pattern
**Learning:** Widespread pattern of using `div` elements with `onclick` handlers for critical features (modals, speaker details) makes them completely inaccessible to keyboard users, as they lack focusability (`tabindex`) and semantic role (`role="button"`).
**Action:** Always verify `div` based interactive elements for `role="button"` and `tabindex="0"`, and ensure they are supported by a global keyboard event listener (e.g., `initAccessibility`) that maps 'Enter' and 'Space' to `click()`.
