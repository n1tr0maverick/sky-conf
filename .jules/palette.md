## 2026-06-15 - [Skip Links vs JS Smooth Scroll]
**Learning:** JS smooth scroll implementations (via `e.preventDefault()`) can break accessible "Skip to Content" links by preventing the browser from shifting focus to the target element.
**Action:** Always exclude skip links from global smooth scroll event listeners or explicitly manage focus within the custom scroll handler.
