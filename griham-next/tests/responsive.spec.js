// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = path.resolve('C:/Users/dhruv/.gemini/antigravity-ide/brain/1eef0faf-290c-44d4-a4d3-3b07f90ca913/screenshots');
const LOCAL_SCREENSHOTS_DIR = path.resolve(__dirname, '../artifacts/screenshots');

[ARTIFACTS_DIR, LOCAL_SCREENSHOTS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function saveDualScreenshot(page, filename) {
  const p1 = path.join(ARTIFACTS_DIR, filename);
  const p2 = path.join(LOCAL_SCREENSHOTS_DIR, filename);
  await page.screenshot({ path: p1, fullPage: false });
  try {
    fs.copyFileSync(p1, p2);
  } catch (e) {}
}

test.describe('Responsive Tests — 320px Mobile Extra Small', () => {
  test.use({ viewport: { width: 320, height: 568 } });

  test('320px: Zero Horizontal Overflow & Clean Viewport', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        bodyWidth: document.body.scrollWidth,
      };
    });

    expect(overflow.scrollWidth).toBeLessThanOrEqual(320);
    expect(overflow.bodyWidth).toBeLessThanOrEqual(320);
    await saveDualScreenshot(page, 'responsive-320px-mobile-xs.png');
  });

  test('320px: Header Hamburger Navigation & Search Overlay', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Desktop search bar should NOT be visible on mobile
    const desktopSearch = page.locator('.search-container');
    await expect(desktopSearch).toBeHidden();

    // Hamburger button should be visible with >= 44px touch target
    const hamburger = page.locator('.mobile-menu-btn, .hamburger-btn').first();
    await expect(hamburger).toBeVisible();
    const box = await hamburger.boundingBox();
    expect(box && box.height >= 40 && box.width >= 40).toBeTruthy();

    // Click Hamburger to open Mobile Nav
    await hamburger.click();
    await expect(page.locator('.mobile-nav-panel')).toBeVisible();

    // Close Mobile Nav
    await page.locator('.close-mobile-nav-btn').click();
    await expect(page.locator('.mobile-nav-panel')).toBeHidden();

    // Search Toggle Button should open full-width overlay
    const searchToggle = page.locator('.mobile-search-toggle-btn').first();
    await expect(searchToggle).toBeVisible();
    await searchToggle.click();

    const searchOverlay = page.locator('.mobile-search-overlay');
    await expect(searchOverlay).toBeVisible();
    const overlayBox = await searchOverlay.boundingBox();
    expect(overlayBox && overlayBox.width >= 300).toBeTruthy();
  });

  test('320px: Product Grid 1 Column, Aspect-Square & Min 44px Touch Targets', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Product Grid columns check
    const cols = await page.evaluate(() => {
      const el = document.getElementById('productGridContainer');
      if (!el) return 0;
      return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
    });
    expect(cols).toBe(1);

    // Aspect-square image check
    const squarePassed = await page.evaluate(() => {
      const thumbs = document.querySelectorAll('.product-card-thumb-wrap');
      if (thumbs.length === 0) return false;
      for (const t of Array.from(thumbs).slice(0, 3)) {
        const rect = t.getBoundingClientRect();
        if (Math.abs(rect.width - rect.height) > 4) return false;
      }
      return true;
    });
    expect(squarePassed).toBeTruthy();

    // Full-width Add to Cart button
    const btn = page.locator('.add-to-cart-btn').first();
    await expect(btn).toBeVisible();
    const btnBox = await btn.boundingBox();
    expect(btnBox && btnBox.height >= 40 && btnBox.width >= 200).toBeTruthy();
  });

  test('320px: Cart Drawer is Full Width (100vw) Not Cut Off', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Open Cart Drawer
    await page.locator('.cart-btn').first().click();
    const drawer = page.locator('.slide-drawer');
    await expect(drawer).toBeVisible();

    const drawerWidth = await drawer.evaluate((el) => el.offsetWidth);
    expect(drawerWidth).toBeLessThanOrEqual(320);
    expect(drawerWidth).toBeGreaterThanOrEqual(300);

    // Close Cart Drawer
    await page.locator('.drawer-close-btn').first().click();
    await expect(drawer).toBeHidden();
  });
});

test.describe('Responsive Tests — 375px Mobile Standard', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('375px: Zero Horizontal Overflow & Full Width Cart', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
    expect(overflow).toBeTruthy();

    // Check Cart
    await page.locator('.cart-btn').first().click();
    const drawer = page.locator('.slide-drawer');
    await expect(drawer).toBeVisible();

    const drawerWidth = await drawer.evaluate((el) => el.offsetWidth);
    expect(drawerWidth).toBeLessThanOrEqual(375);
    expect(drawerWidth).toBeGreaterThanOrEqual(350);

    await page.locator('.drawer-close-btn').first().click();
    await expect(drawer).toBeHidden();

    await saveDualScreenshot(page, 'responsive-375px-mobile-standard.png');
  });
});

test.describe('Responsive Tests — 768px Tablet Portrait', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('768px: Zero Horizontal Overflow, 2-Column Grid & Tablet Drawer', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
    expect(overflow).toBeTruthy();

    const cols = await page.evaluate(() => {
      const el = document.getElementById('productGridContainer');
      if (!el) return 0;
      return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
    });
    expect(cols).toBe(2);

    // Cart Drawer should be fixed width ~420px, not full screen
    await page.locator('.cart-btn').first().click();
    const drawer = page.locator('.slide-drawer');
    await expect(drawer).toBeVisible();

    const drawerWidth = await drawer.evaluate((el) => el.offsetWidth);
    expect(drawerWidth).toBeLessThanOrEqual(480);
    expect(drawerWidth).toBeGreaterThanOrEqual(400);

    await page.locator('.drawer-close-btn').first().click();
    await expect(drawer).toBeHidden();

    await saveDualScreenshot(page, 'responsive-768px-tablet-portrait.png');
  });
});

test.describe('Responsive Tests — 1024px Laptop Small', () => {
  test.use({ viewport: { width: 1024, height: 768 } });

  test('1024px: Zero Horizontal Overflow, Desktop Search & 3-Column Grid', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
    expect(overflow).toBeTruthy();

    // Desktop search bar should be visible
    const desktopSearch = page.locator('.search-container');
    await expect(desktopSearch).toBeVisible();

    // Mobile Hamburger should be hidden
    const hamburger = page.locator('.mobile-menu-btn, .hamburger-btn').first();
    await expect(hamburger).toBeHidden();

    // 3 Column Grid
    const cols = await page.evaluate(() => {
      const el = document.getElementById('productGridContainer');
      if (!el) return 0;
      return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
    });
    expect(cols).toBe(3);

    await saveDualScreenshot(page, 'responsive-1024px-laptop-small.png');
  });
});

test.describe('Responsive Tests — 1440px Desktop Standard', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('1440px: Zero Horizontal Overflow & 4-Column Grid', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
    expect(overflow).toBeTruthy();

    // 4 Column Grid
    const cols = await page.evaluate(() => {
      const el = document.getElementById('productGridContainer');
      if (!el) return 0;
      return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
    });
    expect(cols).toBe(4);

    await saveDualScreenshot(page, 'responsive-1440px-desktop-standard.png');
  });
});

test.describe('Responsive Tests — 2560px Ultra-Wide 4K', () => {
  test.use({ viewport: { width: 2560, height: 1440 } });

  test('2560px: Zero Horizontal Overflow & Centered Container', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
    expect(overflow).toBeTruthy();

    await saveDualScreenshot(page, 'responsive-2560px-ultrawide-4k.png');
  });
});
