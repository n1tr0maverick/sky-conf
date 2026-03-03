# Bolt's Journal

## Optimized Scroll Listener in Navbar
- **What:** Throttled `scroll` event listener in `initNavbar` using `requestAnimationFrame` and added state tracking (`isScrolled`) to prevent redundant DOM updates.
- **Why:** The original listener ran on every scroll event, causing layout thrashing.
- **Impact:** Reduced `classList` operations from ~60/sec (during scroll) to only when state changes (1-2 times per session). Benchmark showed reduction from 46 calls to 1 call for a 1000px scroll.

## 2026-02-05 - [Bulk Lazy Loading Optimization]
**Learning:** When using regex for bulk HTML updates, context-aware counting is essential to distinguish identical assets (like logos) used in different positions (Navbar vs Footer).
**Action:** Always count occurrences or use parent context when excluding LCP elements from lazy loading optimization.

## $(date +%Y-%m-%d) - [Scroll Event Layout Thrashing and Redundant DOM Writes]
**Learning:** During continuous scroll events, repeatedly reading \`offsetTop\` forces synchronous layout recalculations, causing severe performance degradation. Additionally, executing \`classList.add/remove\` redundantly even when the class state hasn't changed triggers unnecessary style recalculations. Parallax animations can also be heavy if calculated for off-screen elements or lacking GPU acceleration (\`translateY\` vs \`translate3d\`).
**Action:** When implementing scroll-driven active navigation or parallax effects, cache layout metrics (\`offsetTop\`, \`offsetHeight\`) on \`load\`, \`resize\`, and via \`ResizeObserver\`. Use state tracking variables (\`lastActiveId\`) to update the DOM only when the active section changes. Limit parallax calculations to elements inside the visible viewport and use \`translate3d\` to offload rendering to the GPU.
