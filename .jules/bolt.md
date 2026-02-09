# Bolt's Journal

## Optimized Scroll Listener in Navbar
- **What:** Throttled `scroll` event listener in `initNavbar` using `requestAnimationFrame` and added state tracking (`isScrolled`) to prevent redundant DOM updates.
- **Why:** The original listener ran on every scroll event, causing layout thrashing.
- **Impact:** Reduced `classList` operations from ~60/sec (during scroll) to only when state changes (1-2 times per session). Benchmark showed reduction from 46 calls to 1 call for a 1000px scroll.

## 2026-02-05 - [Bulk Lazy Loading Optimization]
**Learning:** When using regex for bulk HTML updates, context-aware counting is essential to distinguish identical assets (like logos) used in different positions (Navbar vs Footer).
**Action:** Always count occurrences or use parent context when excluding LCP elements from lazy loading optimization.

## 2026-05-20 - [Scroll Spy Optimization & Fix]
**Learning:** Performance optimization can uncover functional bugs. The scroll spy logic was consuming CPU (~800 layout reads/scroll) but doing nothing visually because the `.active` CSS class was missing.
**Action:** Always verify the *visual* output of the feature being optimized, not just the code performance metrics. Speed is useless if the feature is broken.
