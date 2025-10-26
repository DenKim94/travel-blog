import { test, expect } from '@playwright/test';
import { visibilityTimeout_ms } from '../utils/testParameters';

test.describe('Landing Page Tests', () => {
    test('Landingpage zeigt Text und Titelbild nach Animation', async ({ page }) => {
        await page.goto('/de');
        
        // [Sichtbarkeit des Titeltextes prüfen]
        const titleText = page.getByTestId("landing-page-title");
        await expect(titleText).toBeVisible({ timeout: visibilityTimeout_ms });
        await expect(titleText).toHaveText(/life is short and the world is wide!/i);

        // [Sichtbarkeit und Ladezustand des Titelbildes prüfen]
        const titleImage = page.getByTestId("landing-page-image");
        await expect(titleImage).toBeVisible({ timeout: visibilityTimeout_ms });

        const imageLoaded = await titleImage.evaluate(
            (img: HTMLImageElement) => {
                // "complete" ist true, wenn das Bild fertig geladen ist (auch bei Fehler)
                if (!img.complete) return false;
                // "naturalWidth" ist 0, wenn das Bild nicht geladen werden konnte (z.B. 404)
                if (img.naturalWidth === 0) return false;
                
                // Wenn beide Bedingungen erfüllt sind, ist das Bild korrekt geladen
                return true;
            }
        );
        
        expect(imageLoaded, "Das Bild konnte nicht vollständig geladen werden.").toBe(true);
    });
});

