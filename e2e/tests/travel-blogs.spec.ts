import { expect, test } from '@playwright/test';
import { TestHelpers } from '../utils/testHelpers';
import { navigationIds }  from "@utils/appConstants"
import { testLanguage, visibilityTimeout_ms, blogPostsMockData } from '../utils/testParameters';

test.describe('Tests für die Elemente der Reiseblog-Seite', () => {
    test('[Mobile Ansicht] Swipe-Icon ist sichtbar', async ({ page, isMobile }) => {
        await page.goto(`/${testLanguage}#${navigationIds.blogs}`);

        // Test nur für mobile Ansicht durchführen
        test.skip(!isMobile, 'Test ist nur für mobile Ansicht relevant');

        // Prüfen, ob das Titelbild und der Swipe-Icon sichtbar sind
        await TestHelpers.expectImageToBeLoaded(page, "travel-map-image");
        await TestHelpers.expectImageToBeLoaded(page, "swipe-icon-image");
        await TestHelpers.expectElementToBeHidden(page, "swipe-icon-image");
    });

    test('Blogeinträge sind sichtbar', async ({ page }) => {
        await page.goto(`/${testLanguage}#blog-posts`);
        // Anzahl der Blog-Einträge anhand der gemockten Daten ermitteln
        const numberOfBlogPosts = blogPostsMockData.data.length;

        // Prüfen, ob die Blog-Seite sichtbar ist
        const blogPostsContainer = page.getByTestId("blog-posts-container");
        await expect(blogPostsContainer).toBeInViewport({ timeout: visibilityTimeout_ms });

        // Alle Kind-Elemente mit der entsprechenden Test-ID im Container finden
        const allBlogPostCards = blogPostsContainer.getByTestId("blog-post-card");

        // Prüfen, ob die Anzahl der im DOM gerenderten Blogeinträge dem Sollwert entspricht
        await expect(allBlogPostCards).toHaveCount(numberOfBlogPosts);
    });

    test('Klick auf einen bestimmten Blogeintrag und Prüfung des Inhalts', async ({ page }) => {
        await page.goto(`/${testLanguage}#blog-posts`);

        // String, um bestimmten Blog-Eintrag (Land) zu finden
        const filteredText = "Kanada";

        // Alle Kind-Elemente mit der entsprechenden Test-ID im Container finden
        const blogPostsContainer = page.getByTestId("blog-posts-container");

        // TODO: Fix der Filterfunktion [03.11.2025]
        const filteredBlogPost = blogPostsContainer.filter({
                has: page.getByTestId('blog-post-card').filter({ hasText: filteredText }) });

        await expect(filteredBlogPost).toHaveCount(1);

        // Klicke die gefundene Karte an
        await filteredBlogPost.click();
        await TestHelpers.wait_ms(500);

        // Überprüfe, ob die Navigation zur Detailseite erfolgreich war
        await expect(page).toHaveURL(new RegExp(`.*/blogs/.*${filteredText}.*`));
        
        // Überprüfe, ob der Inhalt sichtbar ist
        const blogPostContainer = page.getByTestId("detailed-blog-post-content");
        await expect(blogPostContainer).toBeInViewport({ timeout: visibilityTimeout_ms });
        await expect(blogPostContainer).toContainText(filteredText);

        // Überprüfe, ob mindestens ein Bild sichtbar ist
        const blogPostImageContainer = page.getByTestId("image-carousel");
        await expect(blogPostImageContainer).toBeInViewport({ timeout: visibilityTimeout_ms });

        const allImageElements = blogPostImageContainer.getByTestId("image-carousel-content");
        const numOfImages = await allImageElements.count();
        expect(numOfImages).toBeGreaterThan(0);

        // Überprüfe, ob der Text sichtbar ist
        const blogPostTextContainer = page.getByTestId("markdown-content");
        await expect(blogPostTextContainer).toBeInViewport({ timeout: visibilityTimeout_ms });
    });

});