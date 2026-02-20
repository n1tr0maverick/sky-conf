## 2026-02-20 - Retrofitting Accessibility on Interactive Divs
**Learning:** Retrofitting `div` elements with `role="button"` and `tabindex="0"` combined with a global `keydown` listener is safer for existing CSS than converting to native `<button>` elements, especially when extensive CSS resets would be required.
**Action:** Use this pattern for future accessibility retrofits on legacy components to minimize visual regressions.
