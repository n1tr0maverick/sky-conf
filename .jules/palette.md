## 2026-02-16 - Accessibility Retrofitting Pattern
**Learning:** Found a recurring pattern of `div` elements with `onclick` handlers lacking keyboard accessibility attributes (`role="button"`, `tabindex="0"`). This was common in `.speaker-card` and `.initiator-card` components.
**Action:** Implemented a centralized `initAccessibility()` function in `script.js` to retrofit these attributes and add keyboard support (`keydown` for Enter/Space) dynamically. This avoids cluttering HTML with repetitive attributes and ensures future elements matching the selector are covered if re-initialized.
