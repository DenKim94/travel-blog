import { test } from '@playwright/test';
import { TestHelpers } from '../utils/testHelpers';

test.describe('Landing Page Tests', () => {
    test('Landingpage zeigt Text und Titelbild nach Animation', async ({ page }) => {
        await page.goto('/de');
    
        // [Sichtbarkeit des Titeltextes prüfen]
        await TestHelpers.expectElementToContainText(page, "landing-page-title", /life is short and the world is wide!/i);

        // [Sichtbarkeit und Ladezustand des Titelbildes prüfen]
        await TestHelpers.expectImageToBeLoaded(page, "landing-page-image");
    });
});

