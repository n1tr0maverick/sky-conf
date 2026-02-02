# Bolt's Journal

## Performance & Best Practices

### CSS Animation vs JS Transform Conflict
**Anti-pattern:** Applying JS-driven transforms (e.g., parallax effects) directly to elements that already have CSS keyframe animations modifying the `transform` property.
**Impact:** The CSS animation typically overrides the inline style set by JavaScript (or causes conflicts), resulting in broken or non-functional effects.
**Solution:** Use a wrapper element. Apply the JavaScript-driven transform (e.g., parallax positioning) to the wrapper, and apply the CSS animation (e.g., floating effect) to the inner element. This separates concerns and ensures both transforms compose correctly.

### Scroll Performance
**Pattern:** Cache DOM queries outside of scroll event listeners.
**Impact:** Repeatedly calling `querySelectorAll` inside a high-frequency event like `scroll` (even when throttled via `requestAnimationFrame`) adds unnecessary CPU overhead.
**Solution:** Query elements once during initialization and store them in a variable.

**Pattern:** Use `translate3d` for scroll animations.
**Impact:** Using `translateY` often triggers layout/paint operations.
**Solution:** Use `translate3d(0, y, 0)` to encourage the browser to promote the element to its own compositor layer (GPU acceleration).
