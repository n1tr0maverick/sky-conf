## 2024-05-22 - Global Focus Visibility
**Learning:** The entire application lacked visible focus indicators for keyboard navigation, making it inaccessible for keyboard users despite using semantic HTML.
**Action:** Always verify keyboard navigation early using Playwright scripts that simulate `Tab` presses, as `element.focus()` does not reliably trigger `:focus-visible`.
