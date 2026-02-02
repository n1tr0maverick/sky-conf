# Bolt's Journal

## Performance Patterns

### Scroll Handler Optimization
- **Problem**: Accessing layout properties (e.g., `offsetTop`) inside a scroll event listener—even when throttled via `requestAnimationFrame`—causes synchronous reflows (Layout Thrashing) if followed by style mutations.
- **Solution**: Cache layout metrics in an array outside the event listener. Iterate over the cached data instead of the DOM elements.
- **Critical Edge Case**: Initial caching on `DOMContentLoaded` is insufficient if the page contains images or dynamic content that shifts layout upon loading.
- **Fix**: The cache must be invalidated/updated on both `window.resize` (debounced) and `window.load` (to account for loaded assets).
