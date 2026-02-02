## 2024-05-22 - [Accessible Modals]
**Learning:** Custom modals without focus management (trap & restore) and ARIA attributes render an app unusable for keyboard and screen reader users. Vanilla JS implementation requires explicit handling of `aria-hidden`, `tabindex`, and focus loops.
**Action:** Always implement a focus manager for modals that handles initial focus, traps tab navigation, and restores focus on close.
