import { test, expect } from '@playwright/test';
import { visibilityTimeout_ms, testNavigationItems, testLanguage, searchInput } from '../utils/testParameters';
import { navigationTitleTranslations }  from "@utils/appConstants"
import { TestHelpers } from '../utils/testHelpers';

test.describe('Tests für die Elemente der Navigationsleiste', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`/${testLanguage}`);
    });

    test('Navigationsleiste ist sichtbar und enthält alle erforderlichen Elemente', async ({ page, isMobile }) => {

        const navBarElements = navigationTitleTranslations[testLanguage];
        const languageSetterId = isMobile ? "global-language-setter-mobile" : "global-language-setter-container";

        // Navigationsleiste ist sichtbar
        const navBarContainer = page.getByTestId("navigation-bar-container");
        await expect(navBarContainer).toBeVisible({ timeout: visibilityTimeout_ms });

        // Logo ist sichtbar
        const appLogo = page.getByTestId("navigation-bar-logo");
        await expect(appLogo).toBeInViewport({ timeout: visibilityTimeout_ms });

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
            await expect(menuBarContainer).toBeInViewport({ timeout: visibilityTimeout_ms });
            await TestHelpers.expectImageToBeLoaded(page, "mobile-menu-icon");
        }

        // Sprach-Auswahl ist sichtbar
        const languageSetter = page.getByTestId(languageSetterId);
        await expect(languageSetter).toBeInViewport({ timeout: visibilityTimeout_ms });
    });

    test('Mobiles Navigationsmenü öffnet und schließt korrekt', async ({ page, isMobile }) => {

        // Test nur für mobile Ansicht durchführen
        test.skip(!isMobile, 'Test nur für mobile Ansicht relevant');

        const navBarElements = navigationTitleTranslations[testLanguage];
        const mobileMenuButton = page.getByTestId("mobile-menu-button");
        const mobileMenuOpenContainer = page.getByTestId("mobile-menu-open-container");

        // Anfangs ist das mobile Menü geschlossen
        await expect(mobileMenuOpenContainer).not.toBeInViewport({ timeout: visibilityTimeout_ms });
        await expect(mobileMenuOpenContainer).toHaveClass(/--hidden/);

        // Mobiles Menü öffnen
        await expect(mobileMenuButton).toBeInViewport({ timeout: visibilityTimeout_ms });
        await mobileMenuButton.click();
        await TestHelpers.wait_ms(800);

        // Geöffnetes Menü ist sichtbar
        await expect(mobileMenuOpenContainer).toHaveCSS('backdrop-filter', /blur\(\d+px\)/);
        await expect(mobileMenuOpenContainer).toHaveClass(/--visible/);

        const menuBarItems = page.getByTestId("mobile-menu-list").getByRole("menuitem");
        const mobileMenuCloseButton = page.getByTestId("mobile-menu-close-button");

        await expect(mobileMenuOpenContainer).toBeInViewport({ timeout: visibilityTimeout_ms });
        await expect(mobileMenuCloseButton).toBeInViewport({ timeout: visibilityTimeout_ms });

        // Prüfen, ob Navigations-Elemente die erwarteten Texte in der exakten Reihenfolge enthalten.
        await expect(menuBarItems).toHaveText([
            navBarElements.blogs.toUpperCase(),
            navBarElements.about.toUpperCase(), 
            navBarElements.contact.toUpperCase()
        ]);

        // Such-Icon ist sichtbar
        await TestHelpers.expectImageToBeLoaded(page, "mobile-menu-search-icon");

        // Mobiles Menü schließen
        await mobileMenuCloseButton.click();
        await TestHelpers.wait_ms(800);
        await expect(mobileMenuOpenContainer).not.toBeInViewport({ timeout: visibilityTimeout_ms });
        await expect(mobileMenuOpenContainer).toHaveClass(/--hidden/);
    });

    test('Navigation zu den jeweiligen Seitenabschnitten nach dem Klick auf ein Navigationselement.', async ({ page, isMobile }) => {
        const appLogo = page.getByTestId("navigation-bar-logo");
        const mobileMenuOpenContainer = page.getByTestId("mobile-menu-open-container");

        if (isMobile) {
            const mobileMenuButton = page.getByTestId("mobile-menu-button");

            // for-of-Schleife verwenden, um async/await Kompatibilität zu gewährleisten (im Gegensatz zu forEach)
            for (const item of testNavigationItems) {
                // Mobiles Menü öffnen
                await mobileMenuButton.click();
                
                // Warten, bis das Menü vollständig sichtbar ist
                await expect(mobileMenuOpenContainer).toHaveClass(/--visible/);
                
                // Klick auf das Navigationselement
                await TestHelpers.expectSmoothScrollToSection(
                    page,
                    "menuitem", 
                    item.title, 
                    item.id, 
                    `#${item.id}`
                );

                // Menü sollte nach dem Klick geschlossen sein
                await expect(mobileMenuOpenContainer).toHaveClass(/--hidden/);
            }

        }else{

            await expect(mobileMenuOpenContainer).not.toBeInViewport(); 
            // Klick auf das Navigationselement in der Desktop-Navigationsleiste und Überprüfung
            for (const item of testNavigationItems) {
                await TestHelpers.expectSmoothScrollToSection(
                    page,
                    "menuitem",
                    item.title, 
                    item.id, 
                    `#${item.id}`
                );
            }
        }

        // Klick auf das Logo und Überprüfung der URL
        await appLogo.click();
        await expect(page).toHaveURL(`/${testLanguage}`);
    });

    test('Test für den Search-Button und die Suchfunktion [valider Teilstring]', async ({ page, isMobile }) => {
        // ID des Search-Buttons je nach Ansicht
        const searchButtonId = isMobile ? "mobile-menu-search-button" : "search-button";
        const searchFieldContainerId = "search-field-container";
        const searchFieldId = "search-input-field";

        if (isMobile) { await TestHelpers.openMobileMenu(page) };
        
        // Suchfeld öffnen
        await TestHelpers.openSearchField(page, searchButtonId, searchFieldContainerId);

        // Validen Suchbegriff eingeben und Suche auslösen [Valider Teilstring]
        await TestHelpers.executeSearch(page, searchFieldId, searchInput.valid_partial);
        await TestHelpers.wait_ms(500); // ggf. warten, bis die Animation verarbeitet ist
        await TestHelpers.expectElementToBeHidden(page, searchFieldContainerId);
        // Überprüfung, ob korrekte Suchergebnisse angezeigt werden
        await TestHelpers.checkSearchResults(page, "search-results-board-container", "found-blog-posts-container");
    });

    test('Test für den Search-Button und die Suchfunktion [valider Suchstring]', async ({ page, isMobile }) => {
        // ID des Search-Buttons je nach Ansicht
        const searchButtonId = isMobile ? "mobile-menu-search-button" : "search-button";
        const searchFieldContainerId = "search-field-container";
        const searchFieldId = "search-input-field";

        if (isMobile) { await TestHelpers.openMobileMenu(page) };
        
        // Suchfeld öffnen
        await TestHelpers.openSearchField(page, searchButtonId, searchFieldContainerId);

        // Validen Suchbegriff eingeben und Suche auslösen [Valider Suchstring]
        await TestHelpers.executeSearch(page, searchFieldId, searchInput.valid_complete);
        await TestHelpers.wait_ms(500); // ggf. warten, bis die Animation verarbeitet ist
        await TestHelpers.expectElementToBeHidden(page, searchFieldContainerId);
        // Überprüfung, ob korrekte Suchergebnisse angezeigt werden
        await TestHelpers.checkSearchResults(page, "search-results-board-container", "found-blog-posts-container");
    });   
    
    test('Test für den Search-Button und die Suchfunktion [ungültiger Suchstring]', async ({ page, isMobile }) => {
        // ID des Search-Buttons je nach Ansicht
        const searchButtonId = isMobile ? "mobile-menu-search-button" : "search-button";
        const searchFieldContainerId = "search-field-container";
        const searchFieldId = "search-input-field";

        if (isMobile) { await TestHelpers.openMobileMenu(page) };
        
        // Suchfeld öffnen
        await TestHelpers.openSearchField(page, searchButtonId, searchFieldContainerId);

        // Ungültigen Suchbegriff eingeben und Suche auslösen [Ungültiger String]
        await TestHelpers.executeSearch(page, searchFieldId, searchInput.invalid);
        await TestHelpers.wait_ms(500); // ggf. warten, bis die Animation verarbeitet ist
        await TestHelpers.expectElementToBeHidden(page, searchFieldContainerId);
        // Überprüfung, ob korrekte Suchergebnisse angezeigt werden
        await TestHelpers.checkSearchResults(page, "search-results-not-found-container", "data-not-found-container");
    }); 
});