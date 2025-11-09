import { expect, test } from '@playwright/test';
import { TestHelpers } from '../utils/testHelpers';
import { navigationIds }  from "@utils/appConstants"
import { testLanguage, visibilityTimeout_ms, aboutPageMockData } from '../utils/testParameters';

test.describe('Tests für die Elemente der About-Seite', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`/${testLanguage}#${navigationIds.about}`);
    });

    test('Elemente sind korrekt geladen und sichtbar.', async ({ page }) => {
        // Prüfen, ob die About-Seite sichtbar ist
        const aboutPageContainer = page.getByTestId("about-page-container");
        await expect(aboutPageContainer).toBeInViewport({ timeout: visibilityTimeout_ms });

        // Prüfen, ob das Titelbild und das Profilbild sichtbar sind
        await TestHelpers.expectImageToBeLoaded(page, "about-page-title-image");
        await TestHelpers.expectImageToBeLoaded(page, "about-page-profile-image");

        // Prüfen, ob die Texte der About-Seite sichtbar sind
        const descriptionText: string = aboutPageMockData.data[0].AboutDescription;
        await TestHelpers.expectElementToContainText(page, "markdown-content", descriptionText);
    })
});