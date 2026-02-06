## 2024-05-23 - [Interactive Divs Accessibility]
**Learning:** Interactive elements implemented as `div`s are invisible to screen readers and keyboard users unless they have `role="button"` and `tabindex="0"`.
**Action:** When using `div` for clickable cards to maintain styling, always inject accessibility attributes and keyboard event listeners via JavaScript to ensure compliance without breaking existing CSS.
