import { test, expect } from '@playwright/test';

test.describe('Profile Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the profile page', async ({ page }) => {
    await expect(page).toHaveTitle(/profile-website/);
  });

  test('should display header with name', async ({ page }) => {
    const header = page.locator('h1').first();
    await expect(header).toContainText('Francis Peixoto');
  });

  test('should have language toggle button', async ({ page }) => {
    const languageButton = page.getByRole('button', { name: /language/i });
    await expect(languageButton).toBeVisible();
  });

  test('should have print button', async ({ page }) => {
    const printButton = page.getByRole('button', { name: /print/i });
    await expect(printButton).toBeVisible();
  });

  test('should toggle language when language button is clicked', async ({ page }) => {
    const languageButton = page.getByRole('button', { name: /language/i });

    // Get initial language
    const initialText = await languageButton.textContent();

    // Click to toggle
    await languageButton.click();

    // Wait for change
    await page.waitForTimeout(500);

    // Get new language
    const newText = await languageButton.textContent();

    // Should be different
    expect(initialText).not.toBe(newText);
  });

  test('should display profile sections', async ({ page }) => {
    // Check for main content area
    const mainContent = page.locator('#profile-content');
    await expect(mainContent).toBeVisible();
  });
});
