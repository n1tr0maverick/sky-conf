## 2026-02-17 - Interactive Elements Lacking Accessibility
**Learning:** The application heavily uses `div` elements with `onclick` handlers for critical interactions (cards, carousel slides), making them inaccessible to keyboard users. This pattern is pervasive across `index.html`.
**Action:** When creating new interactive components or modifying existing ones, always ensure `tabindex="0"`, `role="button"`, and keyboard event handlers (`Enter`/`Space`) are included. Use semantic `<button>` elements where possible to avoid this boilerplate.
