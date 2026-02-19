## 2026-02-19 - Retrofitting Accessibility on Interactive Divs
**Learning:** The application extensively uses `div`s with `onclick` for interactive cards (speakers, initiators), which are inaccessible to keyboard users. Using a centralized `initAccessibility` function to inject `role="button"`, `tabindex="0"`, and keyboard handlers proved cleaner than modifying HTML for dozens of elements.
**Action:** When encountering legacy code with widespread inaccessible patterns, prefer a centralized JS-based enhancement function over scattered HTML edits to keep the diff clean and maintenance easy.
