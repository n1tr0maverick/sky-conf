# Bolt's Journal

## Optimized Scroll Listener in Navbar
- **What:** Throttled `scroll` event listener in `initNavbar` using `requestAnimationFrame` and added state tracking (`isScrolled`) to prevent redundant DOM updates.
- **Why:** The original listener ran on every scroll event, causing layout thrashing.
- **Impact:** Reduced `classList` operations from ~60/sec (during scroll) to only when state changes (1-2 times per session). Benchmark showed reduction from 46 calls to 1 call for a 1000px scroll.

## 2026-02-05 - [Bulk Lazy Loading Optimization]
**Learning:** When using regex for bulk HTML updates, context-aware counting is essential to distinguish identical assets (like logos) used in different positions (Navbar vs Footer).
**Action:** Always count occurrences or use parent context when excluding LCP elements from lazy loading optimization.

## 2026-05-23 - [Scroll Handler Layout Thrashing]
**Learning:** In scroll-heavy applications with parallax effects, even `requestAnimationFrame` throttling is insufficient if the callback invalidates layout (e.g., via `classList` changes) on every frame.
**Action:** Always introduce state tracking (e.g., `lastActiveId`) to ensure DOM updates only occur when the logical state changes, preventing the "Force Reflow" cycle with subsequent layout reads (like `offsetTop`).
