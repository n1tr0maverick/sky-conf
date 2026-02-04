## 2024-05-23 - Keyboard Accessibility for Div Buttons
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for interactive cards (Speakers, Initiators). These are inaccessible to keyboard users as they lack `role="button"`, `tabindex="0"`, and keydown handlers.
**Action:** When creating clickable cards in the future, prefer `<button>` or `<a>` tags. If `div`s must be used, ensure `role="button"`, `tabindex="0"`, and proper keyboard event listeners are added immediately.
