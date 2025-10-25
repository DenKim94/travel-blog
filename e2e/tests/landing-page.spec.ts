import { test, expect } from '@playwright/test';

test.describe('Landing Page Tests', () => {
    test('Landingpage zeigt Text und Titelbild nach Animation', async ({ page }) => {
        await page.goto('/de');

        const titleText = page.getByTestId("landing-page-title");
        await expect(titleText).toBeVisible({ timeout: 3000 });
        await expect(titleText).toHaveText(/life is short and the world is wide!/i);
    });
});

