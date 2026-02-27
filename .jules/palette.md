## 2024-05-24 - [Keyboard Accessibility for Interactive Divs]
**Learning:** Interactive `div`s (like cards with `onclick`) are inaccessible to keyboard users by default, making parts of the site unusable for those relying on keyboard navigation.
**Action:** Systematically retrofit `role="button"`, `tabindex="0"`, and `keydown` handlers (for Enter/Space) to all such elements using a centralized utility function (`initAccessibility`) to ensure consistent accessibility across the site.
