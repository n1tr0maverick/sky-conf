from playwright.sync_api import sync_playwright
import os
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the local index.html file
        page.goto(f"file://{os.path.abspath('index.html')}")

        # Open SKY 2022 modal
        page.locator("button[onclick=\"openModal('sky2022Modal')\"]").click()

        # Wait for modal animation
        page.wait_for_selector("#sky2022Modal.active")
        time.sleep(0.5) # Wait for fade in

        # Find a card
        card = page.locator("#sky2022Modal .conference-speaker-card[onclick]").first

        # Focus it
        card.focus()

        # Take screenshot of the modal content (to see the outline)
        # We need to target something bigger than the card.
        # The speakers grid is a good candidate.
        page.locator("#sky2022Modal .conference-speakers-grid").screenshot(path="focus_style_full.png")
        print("Screenshot saved to focus_style_full.png")

        browser.close()

if __name__ == "__main__":
    run()
