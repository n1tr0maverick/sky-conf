## 2025-05-23 - Interactive Divs Accessibility
**Learning:** `div` elements with `onclick` handlers are invisible to screen readers and keyboard users unless they have `role="button"` and `tabindex="0"`.
**Action:** When making a non-interactive element interactive, always add `role="button"` and `tabindex="0"`, and ensure keyboard events (Enter/Space) trigger the action.
