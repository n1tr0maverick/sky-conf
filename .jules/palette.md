## 2024-05-23 - Interactive Card Accessibility
**Learning:** Interactive cards implemented as `div`s lack native keyboard support and semantic meaning, requiring manual addition of `role="button"`, `tabindex="0"`, and keydown listeners for Enter/Space.
**Action:** Always audit `onclick` handlers on non-interactive elements and ensure they are keyboard accessible, either by using semantic HTML or adding ARIA roles and event handlers.
