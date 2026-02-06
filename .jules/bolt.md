# Bolt's Journal

## Optimized Scroll Listener in Navbar
- **What:** Throttled `scroll` event listener in `initNavbar` using `requestAnimationFrame` and added state tracking (`isScrolled`) to prevent redundant DOM updates.
- **Why:** The original listener ran on every scroll event, causing layout thrashing.
- **Impact:** Reduced `classList` operations from ~60/sec (during scroll) to only when state changes (1-2 times per session). Benchmark showed reduction from 46 calls to 1 call for a 1000px scroll.

## 2026-02-05 - [Bulk Lazy Loading Optimization]
**Learning:** When using regex for bulk HTML updates, context-aware counting is essential to distinguish identical assets (like logos) used in different positions (Navbar vs Footer).
**Action:** Always count occurrences or use parent context when excluding LCP elements from lazy loading optimization.

## 2026-02-05 - [Cached Layout Metrics in Scroll Handler]
**Learning:** Reading layout properties like `offsetTop` inside a scroll handler (even when throttled with `requestAnimationFrame`) forces synchronous layout recalculations (reflows) on every frame, which can cause jank.
**Action:** Always cache layout metrics (e.g., element positions) outside the scroll listener and update them only on `window.load` and `window.resize`.
