# Bolt's Journal

## Optimized Scroll Listener in Navbar
- **What:** Throttled `scroll` event listener in `initNavbar` using `requestAnimationFrame` and added state tracking (`isScrolled`) to prevent redundant DOM updates.
- **Why:** The original listener ran on every scroll event, causing layout thrashing.
- **Impact:** Reduced `classList` operations from ~60/sec (during scroll) to only when state changes (1-2 times per session). Benchmark showed reduction from 46 calls to 1 call for a 1000px scroll.

## 2026-02-05 - [Bulk Lazy Loading Optimization]
**Learning:** When using regex for bulk HTML updates, context-aware counting is essential to distinguish identical assets (like logos) used in different positions (Navbar vs Footer).
**Action:** Always count occurrences or use parent context when excluding LCP elements from lazy loading optimization.

## 2026-02-06 - [Scroll Handlers Layout Thrashing]
**Learning:** High-frequency event listeners (like `scroll`) querying layout properties (e.g., `offsetTop`, `getBoundingClientRect`) cause synchronous layout recalculations (layout thrashing), even if throttled by `requestAnimationFrame`. Modifying classlists repeatedly on every frame when the active state hasn't changed adds further overhead. Parallax elements also calculate offsets blindly even when far offscreen.
**Action:** Cache static metrics (`offsetTop`, heights) on `load`/`resize` and use `ResizeObserver`. Maintain state (like `lastActiveId`) to prevent redundant DOM writes, and use visibility intersections to skip off-screen calculations. Always apply `translate3d` instead of `translateY` for GPU acceleration.
