## 2024-05-23 - [Keyboard Retrofit Pattern]
**Learning:** Legacy codebases often use semantic-less `div` elements for interactivity. Retrofitting `role="button"`, `tabindex="0"`, and keydown listeners programmatically is a robust pattern to fix this without risky HTML refactoring.
**Action:** Use `initAccessibility()` functions that query `[onclick]` to automatically enhance these elements.
