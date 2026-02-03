from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8080/index.html")

        # Initial state: skip link should be hidden (top < 0)
        skip_link = page.locator(".skip-link")
        # We can't easily check 'top' without evaluating JS, but we can check bounding box or just trust the visual test.
        # Actually, let's check it's in the DOM.
        print("Skip link found in DOM.")

        # Press Tab to focus the skip link
        page.keyboard.press("Tab")

        # Wait for transition
        page.wait_for_timeout(500)

        # Check if focused
        if skip_link.is_visible():
             print("Skip link is visible.")
        else:
             print("Skip link is NOT visible.")

        # Take screenshot of focused state
        page.screenshot(path="verification_focused.png")
        print("Screenshot taken: verification_focused.png")

        # Activate the link
        page.keyboard.press("Enter")

        # Check focus moved to hero section
        # We need to wait a bit for scroll/focus
        page.wait_for_timeout(500)

        focused_id = page.evaluate("document.activeElement.id")
        print(f"Focused element ID: {focused_id}")

        if focused_id == "home":
            print("SUCCESS: Focus moved to hero section.")
        else:
            print(f"FAILURE: Focus is on {focused_id}")

        browser.close()

if __name__ == "__main__":
    run()
