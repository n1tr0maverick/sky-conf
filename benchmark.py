import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.add_init_script("""
            window.metricsCount = { offsetTop: 0, classList: 0, setTransform: 0 };

            // Proxy offsetTop
            const originalOffsetTop = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetTop');
            Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
                get: function() {
                    window.metricsCount.offsetTop++;
                    return originalOffsetTop.get.call(this);
                }
            });

            // Proxy DOMTokenList (classList) add/remove
            const origAdd = DOMTokenList.prototype.add;
            const origRemove = DOMTokenList.prototype.remove;
            DOMTokenList.prototype.add = function(...args) {
                window.metricsCount.classList++;
                return origAdd.apply(this, args);
            };
            DOMTokenList.prototype.remove = function(...args) {
                window.metricsCount.classList++;
                return origRemove.apply(this, args);
            };
        """)

        await page.goto("file:///app/index.html")
        await page.wait_for_function("typeof initOptimizedScrollHandlers === 'function'")

        # Wait for all the initial intersection observers to trigger and settle
        await page.wait_for_timeout(1000)

        # Reset metrics after load
        await page.evaluate("window.metricsCount = { offsetTop: 0, classList: 0, setTransform: 0 };")

        # Scroll down
        for i in range(1, 30):
            await page.evaluate(f"window.scrollTo(0, {i * 100})")
            await page.evaluate("() => window.dispatchEvent(new Event('scroll'))")
            await page.wait_for_timeout(30) # small delay to let rAF run

        metrics = await page.evaluate("window.metricsCount")
        print("Metrics after scroll:", metrics)

        await browser.close()

asyncio.run(run())