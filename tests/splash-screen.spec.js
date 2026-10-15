const { test, expect } = require('@playwright/test');

test('SplashScreen displays on initial load and smoothly disappears after duration', async ({ page }) => {
  // Catch any browser errors
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Verify splash screen is visible right away
  const splash = page.locator('[aria-label="Loading Griham 99+"]');
  await expect(splash).toBeVisible({ timeout: 1000 });

  // Verify "GRIHAM 99+" text and wave loader are present
  await expect(splash.locator('h1')).toContainText('GRIHAM 99+');
  const waveLoader = splash.locator('.wave-loader');
  await expect(waveLoader).toBeVisible();

  // Wait 2.2s for splash screen to complete its 1.8s duration and fade out
  await page.waitForTimeout(2500);

  // Verify splash screen is no longer visible
  await expect(splash).not.toBeVisible();

  // Verify main content is visible and scroll is unlocked
  const header = page.locator('header.site-header');
  await expect(header).toBeVisible();

  const isUnlocked = await page.evaluate(() => {
    return !document.body.classList.contains('modal-open') &&
           document.body.style.overflow !== 'hidden';
  });
  expect(isUnlocked).toBeTruthy();

  // Ensure no crash errors occurred
  expect(errors).toHaveLength(0);
});
