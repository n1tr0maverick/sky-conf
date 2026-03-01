## 2024-05-24 - Improve Keyboard Accessibility for Interactive Elements
**Learning:** Found a pattern of non-native interactive elements (like custom `div`s functioning as buttons or cards) that had `onclick` handlers but lacked keyboard accessibility attributes and event listeners.
**Action:** Created `initAccessibility()` in `script.js` to dynamically retrofit these custom elements with `role="button"`, `tabindex="0"`, and `keydown` event listeners for the 'Enter' and 'Space' keys, ensuring they are accessible to keyboard users.
