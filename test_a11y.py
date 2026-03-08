import asyncio
from playwright.async_api import async_playwright
import os

async def test_a11y():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        filepath = f"file://{os.getcwd()}/index.html"
        await page.goto(filepath)

        # Test focus-visible on an element we retrofitted
        el = page.locator(".carousel-slide").first

        # In playwright to test focus-visible outline, we must click on body then tab
        await page.mouse.click(10, 10)

        # Press tab until we hit a carousel slide.
        found = False
        for _ in range(50):
            await page.keyboard.press("Tab")
            classes = await page.evaluate("document.activeElement.className")
            if "carousel-slide" in classes:
                found = True
                break

        if found:
            print("Successfully focused a carousel slide via Tab.")
            outline = await page.evaluate("window.getComputedStyle(document.activeElement).getPropertyValue('outline')")
            outline_offset = await page.evaluate("window.getComputedStyle(document.activeElement).getPropertyValue('outline-offset')")
            print(f"Outline: {outline}")
            print(f"Outline offset: {outline_offset}")

            # Verify role and tabindex
            role = await page.evaluate("document.activeElement.getAttribute('role')")
            tabindex = await page.evaluate("document.activeElement.getAttribute('tabindex')")
            print(f"Role: {role}, TabIndex: {tabindex}")

            # Press enter to trigger link click (which scrolls)
            print("Pressing Enter...")
            await page.keyboard.press("Enter")
            await page.wait_for_timeout(500)

            # We can check if scrolled or hash changed
        else:
            print("Failed to focus a carousel slide via Tab.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_a11y())
