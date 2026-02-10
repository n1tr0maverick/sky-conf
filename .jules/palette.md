## 2024-05-23 - [Legacy Interaction Retrofitting]
**Learning:** Retrofitting keyboard accessibility to numerous legacy `onclick` divs is most efficiently handled via a centralized JavaScript function (`initAccessibility`) that injects attributes and manages global keydown events, rather than mass-editing HTML markup which pollutes the diff.
**Action:** Implement `initAccessibility` pattern for future interactive elements that lack semantic markup to maintain cleaner HTML source while ensuring WCAG compliance.
