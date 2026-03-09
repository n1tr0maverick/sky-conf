import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the local file
        await page.goto('file:///app/index.html')

        # Wait for any JS to finish executing
        await page.wait_for_load_state("networkidle")

        print("Initial state:")
        active_link = await page.evaluate('''() => {
            const link = document.querySelector('.nav-links a.active');
            return link ? link.getAttribute('href') : null;
        }''')
        print(f"Active Link: {active_link}")

        # Add proxy script to monitor DOM writes
        await page.evaluate('''() => {
            window.classListOperations = 0;
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                const originalAdd = link.classList.add;
                link.classList.add = function(...args) {
                    if (args[0] === 'active') window.classListOperations++;
                    return originalAdd.apply(this, args);
                };
                const originalRemove = link.classList.remove;
                link.classList.remove = function(...args) {
                    if (args[0] === 'active') window.classListOperations++;
                    return originalRemove.apply(this, args);
                };
            });
        }''')

        # Test small scrolling to verify that operations are 0
        print("\\nScrolling slightly to trigger scroll listener...")
        await page.evaluate('''() => {
            window.scrollTo(0, 10);
            window.dispatchEvent(new Event('scroll'));
        }''')

        await page.evaluate('''() => new Promise(resolve => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        })''')

        ops = await page.evaluate("() => window.classListOperations")
        print(f"DOM classList operations during minor scroll: {ops}")

        # Force a larger viewport so elements become visible immediately
        await page.set_viewport_size({"width": 1200, "height": 800})

        print("\\nScrolling to #editions...")
        await page.evaluate('''() => {
            const editions = document.getElementById('editions');
            window.scrollTo(0, editions.offsetTop);
            window.dispatchEvent(new Event('scroll'));
        }''')

        # Wait for RAFs to let the script catch up
        await page.evaluate('''() => new Promise(resolve => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        })''')

        active_link = await page.evaluate('''() => {
            const link = document.querySelector('.nav-links a.active');
            return link ? link.getAttribute('href') : null;
        }''')
        print(f"Active Link after scroll: {active_link}")

        ops = await page.evaluate("() => window.classListOperations")
        print(f"DOM classList operations after #editions scroll: {ops}")

        # Scroll more to trigger orb update checks
        print("\\nScrolling to #register to test orb updates...")
        await page.evaluate('''() => {
            const register = document.getElementById('register');
            window.scrollTo(0, register.offsetTop);
            window.dispatchEvent(new Event('scroll'));
        }''')

        await page.evaluate('''() => new Promise(resolve => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        })''')

        print("\\nVerifying Parallax Transforms...")
        orb_transforms = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('.gradient-orb')).map(orb => orb.style.transform);
        }''')
        print(f"Orb Transforms: {orb_transforms}")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(run())
