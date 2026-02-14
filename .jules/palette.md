## 2024-05-22 - [Interactive Div Accessibility Pattern]
**Learning:** The application heavily relies on `div` elements with `onclick` handlers for interactivity (e.g., speaker cards, carousel slides), lacking native keyboard support.
**Action:** When working with such elements, ensure `role="button"` and `tabindex="0"` are present, and a global keyboard event listener (like `initAccessibility`) is implemented to handle Enter/Space keys.
