import { test, expect } from '@playwright/test';
import { visibilityTimeout_ms } from '../utils/testParameters';
import { navigationTitleTranslations, navigationIds, fallBackId }  from "@utils/appConstants"
import { TestHelpers } from '../utils/testHelpers';

test.describe('Tests für die Navigationsleiste', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/de');
    });

    test('Navigationsleiste ist sichtbar und enthält alle erforderlichen Elemente', async ({ page, isMobile }) => {
        const navBarElements = navigationTitleTranslations['de'];
        const languageSetterId = isMobile ? "global-language-setter-mobile" : "global-language-setter-container";

        // Navigationsleiste ist sichtbar
        const navBarContainer = page.getByTestId("navigation-bar-container");
        await expect(navBarContainer).toBeVisible({ timeout: visibilityTimeout_ms });

        // Logo ist sichtbar
        const navBarLogo = page.getByTestId("navigation-bar-logo");
        await expect(navBarLogo).toBeVisible({ timeout: visibilityTimeout_ms });

        if (!isMobile) {
            // ALLE Navigationselemente als Liste lokalisieren
            const navBarItems = page.getByTestId("navigation-bar-list").getByRole("menuitem");

            // Prüfen, ob Navigations-Elemente die erwarteten Texte in der exakten Reihenfolge enthalten.
            await expect(navBarItems).toHaveText([
                navBarElements.blogs.toUpperCase(), 
                navBarElements.about.toUpperCase(), 
                navBarElements.contact.toUpperCase()
            ]);
            // Such-Icon ist sichtbar
            await TestHelpers.expectImageToBeLoaded(page, "search-icon");

        } else {
            // Mobiles Navigation Menü (geschlossen) ist sichtbar
            const menuBarContainer = page.getByTestId("mobile-menu-container")
            await expect(menuBarContainer).toBeVisible({ timeout: visibilityTimeout_ms });
            await TestHelpers.expectImageToBeLoaded(page, "mobile-menu-icon");
        }

        // Sprach-Auswahl ist sichtbar
        const languageSetter = page.getByTestId(languageSetterId);
        await expect(languageSetter).toBeVisible({ timeout: visibilityTimeout_ms });
    });

});