from playwright.sync_api import sync_playwright
import os
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Set viewport to capture full page width and decent height
        page.set_viewport_size({"width": 1280, "height": 1000})

        # Load the local index.html file
        page.goto(f"file://{os.getcwd()}/index.html")
        page.wait_for_load_state("domcontentloaded")

        # Scroll to the Editions section
        editions_section = page.locator("#editions")
        editions_section.scroll_into_view_if_needed()
        time.sleep(0.5)

        # Find the active tab button (SKY 2022)
        tab_btn = page.locator(".tab-btn.active")
        tab_btn.focus()

        print("Focused on tab button. Pressing Tab to reach speaker cards...")

        # Press Tab to move focus.
        # The first speaker card should be focused after the tab buttons if no other focusable elements exist before it.
        # Check structure: .tab-btn -> .tab-btn -> .speaker-card (in edition-2022)
        # Wait, there are 2 tab buttons.
        # If active is first, pressing tab moves to second tab button.
        # Then to the content.

        # Let's press Tab twice.
        page.keyboard.press("Tab")
        time.sleep(0.2)
        page.keyboard.press("Tab")
        time.sleep(0.2)

        # Now we should be on the first speaker card.
        # Let's take a screenshot of the speaker grid area.

        speakers_grid = page.locator(".speakers-grid").first
        speakers_grid.screenshot(path="verification/focus_state.png")
        print("Screenshot saved to verification/focus_state.png")

        browser.close()

if __name__ == "__main__":
    run()
