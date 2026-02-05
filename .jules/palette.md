## 2026-02-05 - Accessible Interactive Divs
**Learning:** Interactive elements implemented as `div`s (like cards) are invisible to keyboard users and screen readers unless explicitly marked.
**Action:** Always add `role="button"` and `tabindex="0"` to clickable `div`s, and ensure they handle 'Enter' and 'Space' keypresses via a global event listener.
