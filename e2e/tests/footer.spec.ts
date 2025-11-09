import { expect, test } from '@playwright/test';
import * as appConstants from "@utils/appConstants"
import { testLanguage } from '../utils/testParameters';

test.describe('Tests für den Footer', () => {

    // Wir starten auf einer "normalen" Seite, auf der der Footer sichtbar sein sollte.
    test.beforeEach(async ({ page }) => {
        await page.goto(`/${testLanguage}`);
    });

    test('Sollte korrekt geladen werden und alle Elemente anzeigen.', async ({ page }) => {  
        // 1. Hauptcontainer des Footers lokalisieren und auf Sichtbarkeit prüfen.
        const footerContainer = page.getByTestId('footer-container');
        await expect(footerContainer).toBeVisible();

        // 2. Impressum-Link prüfen: Sichtbarkeit, Text und korrekte URL.
        const imprintLink = footerContainer.getByTestId('imprint-link');
        await expect(imprintLink).toBeVisible();
        await expect(imprintLink).toHaveText(appConstants.imprintTranslations[testLanguage]?.title);
        await expect(imprintLink).toHaveAttribute('href', `/${testLanguage}/imprint`);

        // 3. Social-Media-Icons prüfen.
        const iconContainer = footerContainer.getByTestId('icon-container');
        await expect(iconContainer).toBeVisible();

        // Alle Icon-Links innerhalb des Containers finden.
        const socialLinks = iconContainer.locator('a');
        
        // Sicherstellen, dass die Anzahl der Links mit unseren Konstanten übereinstimmt.
        await expect(socialLinks).toHaveCount(appConstants.footerIconProps.length);

        // Stichprobenartig oder vollständig die Attribute der Links prüfen.
        for (const iconProps of appConstants.footerIconProps) {
            const link = iconContainer.locator(`a[href="${iconProps.url}"]`);
            await expect(link).toHaveAttribute('target', '_blank');

            // Bild innerhalb des Links prüfen
            const image = link.locator('img');
            await expect(image).toHaveAttribute('alt', iconProps.alt);
            await expect(image).toHaveAttribute('src', iconProps.src);
        }
    });

    test('Sollte beim Klick auf den Impressum-Link zur Impressumsseite navigieren und dann unsichtbar sein.', async ({ page }) => {
        // Footer auf der Startseite lokalisieren.
        const footerContainer = page.getByTestId('footer-container');
        await expect(footerContainer).toBeVisible();
        
        // Impressum-Link lokalisieren und anklicken.
        const imprintLink = footerContainer.getByTestId('imprint-link');
        await imprintLink.click();

        // Warten auf die Navigation und URL überprüfen.
        // Wir verwenden einen Regulären Ausdruck, um flexibel zu sein.
        await expect(page).toHaveURL(new RegExp(`.*\\/${testLanguage}\\/imprint`));

        // --- Entscheidender Test für die `useIsOnImprintPage`-Logik ---
        // Der Footer sollte jetzt nicht mehr im DOM vorhanden sein.
        await expect(footerContainer).not.toBeVisible();
    });
});
