# Palette's Journal

## YYYY-MM-DD - [Retrofitting Interactive DIVs]
**Learning:** A reusable accessibility pattern for this project involves retrofitting interactive `div` elements (e.g. ones using `onclick` handlers, like speaker cards or carousel slides) by adding `role="button"`, `tabindex="0"`, and a `keydown` listener (for Enter/Space) that explicitly calls `el.click()`.
**Action:** Always ensure that when custom DOM elements are used for interaction, they bubble standard native events and implement standard focus states so they match the behavior of native buttons and can be easily navigated by keyboard.
