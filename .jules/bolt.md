# Bolt's Journal

## Optimized Scroll Listener in Navbar
- **What:** Throttled `scroll` event listener in `initNavbar` using `requestAnimationFrame` and added state tracking (`isScrolled`) to prevent redundant DOM updates.
- **Why:** The original listener ran on every scroll event, causing layout thrashing.
- **Impact:** Reduced `classList` operations from ~60/sec (during scroll) to only when state changes (1-2 times per session). Benchmark showed reduction from 46 calls to 1 call for a 1000px scroll.

## 2026-02-05 - [Bulk Lazy Loading Optimization]
**Learning:** When using regex for bulk HTML updates, context-aware counting is essential to distinguish identical assets (like logos) used in different positions (Navbar vs Footer).
**Action:** Always count occurrences or use parent context when excluding LCP elements from lazy loading optimization.

## 2026-02-06 - [Lazy Loading vs Layout Metrics]
**Learning:** Verification of scroll-spy logic using Playwright failed initially because lazy-loaded images caused `offsetTop` values to shift significantly after the initial load. Standard `wait_for_load_state` is insufficient when layout depends on scroll-triggered assets.
**Action:** In verification scripts involving layout metrics, always force a scroll-to-bottom (to trigger lazy loading) and wait before measuring element positions.
