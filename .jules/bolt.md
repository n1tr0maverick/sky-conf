# Bolt's Journal

## Optimized Scroll Listener in Navbar
- **What:** Throttled `scroll` event listener in `initNavbar` using `requestAnimationFrame` and added state tracking (`isScrolled`) to prevent redundant DOM updates.
- **Why:** The original listener ran on every scroll event, causing layout thrashing.
- **Impact:** Reduced `classList` operations from ~60/sec (during scroll) to only when state changes (1-2 times per session). Benchmark showed reduction from 46 calls to 1 call for a 1000px scroll.

## 2026-02-05 - [Bulk Lazy Loading Optimization]
**Learning:** When using regex for bulk HTML updates, context-aware counting is essential to distinguish identical assets (like logos) used in different positions (Navbar vs Footer).
**Action:** Always count occurrences or use parent context when excluding LCP elements from lazy loading optimization.

## 2026-03-01 - [Layout Thrashing in Scroll Handlers]
**Learning:** Querying `offsetTop` or layout properties like `innerHeight` and `scrollHeight` inside high-frequency scroll event listeners causes synchronous layout recalculations (thrashing). Repeatedly updating DOM classes with identical values also causes redundant style recalculations.
**Action:** Always cache static or semi-static layout metrics (`offsetTop`, `innerHeight`) during initialization, `load`, or `resize` events (or via `ResizeObserver`). Use state variables like `lastActiveId` to ensure DOM writes (`classList` modifications) only occur when the state actually changes.
