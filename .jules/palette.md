## 2024-05-22 - [Retrofitting Accessibility]
**Learning:** Legacy vanilla JS apps often use divs with onclick handlers. A robust pattern to fix this globally without rewriting HTML is to query `[onclick]:not(button):not(a)` and programmatically add `role="button"`, `tabindex="0"`, and keyboard listeners.
**Action:** Use this `initAccessibility` pattern for quick wins in legacy projects.
