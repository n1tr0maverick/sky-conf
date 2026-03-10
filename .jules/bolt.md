# Bolt's Journal

## Optimized Scroll Listener in Navbar
- **What:** Throttled `scroll` event listener in `initNavbar` using `requestAnimationFrame` and added state tracking (`isScrolled`) to prevent redundant DOM updates.
- **Why:** The original listener ran on every scroll event, causing layout thrashing.
- **Impact:** Reduced `classList` operations from ~60/sec (during scroll) to only when state changes (1-2 times per session). Benchmark showed reduction from 46 calls to 1 call for a 1000px scroll.

## 2026-02-05 - [Bulk Lazy Loading Optimization]
**Learning:** When using regex for bulk HTML updates, context-aware counting is essential to distinguish identical assets (like logos) used in different positions (Navbar vs Footer).
**Action:** Always count occurrences or use parent context when excluding LCP elements from lazy loading optimization.

## 2026-02-05 - [Optimized Scroll Layout Thrashing]
**Learning:** Reading layout metrics like `offsetTop` inside a high-frequency `scroll` event listener loop forces synchronous layout calculation (layout thrashing) on every frame. When combined with DOM writes (`classList` and `transform`), performance drops drastically.
**Action:** Always cache dimensions (`offsetTop`, `offsetHeight`, `document.documentElement.scrollHeight`, `window.innerHeight`) on `load` and `resize` (or using `ResizeObserver`), rather than querying them in the scroll handler. Use a state variable (`lastActiveId`) to only perform DOM writes when visual state actually changes. When caching metrics for elements with active transforms (e.g. parallax), remember to explicitly separate the DOM writes (`style.transform = 'none'`) and reads (`getBoundingClientRect()`) into distinct loops.
