
## 2024-10-24 - Missing Global Focus Indicators
**Learning:** The application lacked global `:focus-visible` styles, rendering keyboard navigation (Tab) invisible to users, which is a critical accessibility issue. Even though hover states were defined, focus states were entirely missing for native elements.
**Action:** Added a global `*:focus-visible` CSS rule using the existing `--accent-primary` color and a 4px offset to ensure a clear, consistent, and highly visible focus ring across all interactive components without affecting mouse users.
