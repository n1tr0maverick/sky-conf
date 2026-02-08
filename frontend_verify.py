from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # 1. Focus a carousel slide and take screenshot
        slide = page.locator(".carousel-slide[data-action]").first
        slide.focus()
        page.screenshot(path="verification_carousel_focus.png")

        # 2. Scroll to editions and focus a speaker card
        speaker_card = page.locator(".speaker-card[onclick]").first
        speaker_card.scroll_into_view_if_needed()
        speaker_card.focus()
        page.screenshot(path="verification_speaker_focus.png")

        browser.close()

if __name__ == "__main__":
    run()
