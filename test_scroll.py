import asyncio
from playwright.async_api import async_playwright

async def run_test():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Block external requests
        await page.route("**/*", lambda route: route.continue_() if not route.request.url.startswith("http") else route.abort())

        # Inject script to track DOM reads (layout thrashing) and writes
        await page.add_init_script("""
            window.perfMetrics = { offsetReads: 0, classListWrites: 0 };

            // Proxy offsetTop
            const originalOffsetTop = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetTop');
            Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
                get: function() {
                    window.perfMetrics.offsetReads++;
                    return originalOffsetTop.get.call(this);
                }
            });

            // Proxy DOMTokenList methods
            ['add', 'remove', 'toggle'].forEach(method => {
                const original = DOMTokenList.prototype[method];
                DOMTokenList.prototype[method] = function(...args) {
                    window.perfMetrics.classListWrites++;
                    return original.apply(this, args);
                };
            });
        """)

        await page.goto("file:///app/index.html")
        await page.wait_for_function("typeof window.perfMetrics !== 'undefined'")

        # Wait for initialization (scroll events trigger some initial offsetTop checks)
        await page.wait_for_timeout(1000)

        # Reset metrics after load
        await page.evaluate("window.perfMetrics.offsetReads = 0;")
        await page.evaluate("window.perfMetrics.classListWrites = 0;")

        # Scroll to force a bunch of events
        await page.evaluate("window.scrollTo(0, 1000);")
        await page.evaluate("() => window.dispatchEvent(new Event('scroll'))")
        await page.wait_for_timeout(200)

        await page.evaluate("window.scrollTo(0, 2000);")
        await page.evaluate("() => window.dispatchEvent(new Event('scroll'))")
        await page.wait_for_timeout(200)

        await page.evaluate("window.scrollTo(0, document.body.scrollHeight);")
        await page.evaluate("() => window.dispatchEvent(new Event('scroll'))")
        await page.wait_for_timeout(500)

        # Get metrics
        metrics = await page.evaluate("window.perfMetrics")
        print(f"Metrics: {metrics}")

        if metrics['offsetReads'] > 50:
             print("Warning: High number of layout thrashing reads!")

        if metrics['classListWrites'] > 100:
             print("Warning: High number of DOM ClassList writes!")

        # Check active nav link logic
        active_links = await page.locator('.nav-links a.active').count()
        print(f"Active nav links: {active_links}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_test())
