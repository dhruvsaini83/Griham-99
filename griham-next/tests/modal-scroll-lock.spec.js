const { test, expect } = require('@playwright/test');

test.describe('Modal and Drawer Background Scroll Lock Tests', () => {
  test('Cart Drawer: mouse wheel scroll lock test', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    // Wait for splash screen intro to complete
    await page.waitForTimeout(2200);

    // Scroll down 400px
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(300);
    const initialScrollY = await page.evaluate(() => window.scrollY);
    expect(initialScrollY).toBe(400);

    // Open Cart by clicking cart button in DOM
    await page.evaluate(() => {
      document.querySelector('.cart-btn').click();
    });
    await page.waitForTimeout(600);

    const scrollAfterOpen = await page.evaluate(() => window.scrollY);
    expect(scrollAfterOpen).toBe(initialScrollY);

    // Hover over the backdrop (x: 100, y: 300) and wheel down 600px
    await page.mouse.move(100, 300);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(400);

    const scrollAfterBackdropWheel = await page.evaluate(() => window.scrollY);
    expect(scrollAfterBackdropWheel).toBe(initialScrollY);

    // Hover over the drawer panel and wheel down
    const drawer = page.locator('.slide-drawer').first();
    const box = await drawer.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(400);
    }

    const scrollAfterDrawerWheel = await page.evaluate(() => window.scrollY);
    expect(scrollAfterDrawerWheel).toBe(initialScrollY);

    // Close cart drawer
    await page.evaluate(() => {
      document.querySelector('.drawer-close-btn').click();
    });
    await page.waitForTimeout(500);

    // Now verify that scrolling is restored
    await page.evaluate(() => window.scrollBy(0, 100));
    const scrollAfterRestore = await page.evaluate(() => window.scrollY);
    expect(scrollAfterRestore).toBeGreaterThan(initialScrollY);
  });

  test('Quick View Preview Modal: mouse wheel scroll lock test', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2200);

    // Scroll down to products
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);
    const initialScrollY = await page.evaluate(() => window.scrollY);
    expect(initialScrollY).toBe(500);

    // Open Quick View by clicking preview button in DOM
    await page.evaluate(() => {
      const qvBtn = document.querySelector('button[aria-label="Quick View"]');
      if (qvBtn) qvBtn.click();
    });
    await page.waitForTimeout(600);

    const scrollAfterOpen = await page.evaluate(() => window.scrollY);
    expect(scrollAfterOpen).toBe(initialScrollY);

    // Hover over backdrop outside modal (e.g. left side x: 50, y: 300)
    await page.mouse.move(50, 300);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(400);

    const scrollAfterBackdropWheel = await page.evaluate(() => window.scrollY);
    expect(scrollAfterBackdropWheel).toBe(initialScrollY);

    // Hover inside modal container and wheel scroll
    const modal = page.locator('.modal-container').first();
    const box = await modal.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(400);
    }

    const scrollAfterModalWheel = await page.evaluate(() => window.scrollY);
    expect(scrollAfterModalWheel).toBe(initialScrollY);

    // Close modal
    await page.evaluate(() => {
      document.querySelector('.modal-close-btn').click();
    });
    await page.waitForTimeout(500);

    // Verify scrolling works after close
    await page.evaluate(() => window.scrollBy(0, 100));
    const scrollAfterRestore = await page.evaluate(() => window.scrollY);
    expect(scrollAfterRestore).toBeGreaterThan(initialScrollY);
  });
});
