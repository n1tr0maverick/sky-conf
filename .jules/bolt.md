# Bolt's Journal

## Optimized Scroll Listener in Navbar
- **What:** Throttled `scroll` event listener in `initNavbar` using `requestAnimationFrame` and added state tracking (`isScrolled`) to prevent redundant DOM updates.
- **Why:** The original listener ran on every scroll event, causing layout thrashing.
- **Impact:** Reduced `classList` operations from ~60/sec (during scroll) to only when state changes (1-2 times per session). Benchmark showed reduction from 46 calls to 1 call for a 1000px scroll.

## 2026-02-05 - [Bulk Lazy Loading Optimization]
**Learning:** When using regex for bulk HTML updates, context-aware counting is essential to distinguish identical assets (like logos) used in different positions (Navbar vs Footer).
**Action:** Always count occurrences or use parent context when excluding LCP elements from lazy loading optimization.

## 2026-02-06 - [Parallax Layout Thrashing]
**Learning:** Scroll event handlers accessing DOM layout properties (like `offsetTop` or `offsetHeight`) cause massive layout thrashing (synchronous reflows).
**Action:** Always cache these properties using `window.load`, `window.resize`, and `ResizeObserver`, instead of querying them continuously on scroll. Furthermore, hardware-accelerated animations using `translate3d` shouldn't be applied to elements that already have CSS animations (`float`), as it will override them; wrap them in an independent `div` and apply the translation there.
