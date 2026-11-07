import { Page, expect } from '@playwright/test';
import { visibilityTimeout_ms } from './testParameters';

/**
 * Zulässige Abweichung in Pixeln, mit der ein Abschnitt nach dem Scrollen
 * am oberen Rand des Scroll-Containers anliegen muss.
 *
 * Der Wert trennt bewusst großzügig: Nach dem Klick werden Abweichungen von
 * bis zu ~110 px gemessen, weil nachladende Bilder das Layout noch leicht
 * verschieben. Ohne Klick liegen die Abweichungen dagegen bei 600 px und mehr,
 * und ein Sprung zum falschen Abschnitt läge bei mindestens einer Abschnittshöhe.
 * 200 px liegt sicher zwischen beiden Fällen.
 */
const scrollAlignTolerance_px = 200;

export class TestHelpers {

    /**
     * Hält die Ausführung für eine bestimmte Anzahl von Millisekunden an.
     * @param ms Die Anzahl der Millisekunden, die gewartet werden soll.
     */
    static async wait_ms(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Überprüft, ob ein Bild, das über eine testId identifiziert wird, sichtbar ist und vollständig geladen wurde.
     * Wirft einen Fehler, wenn das Bild nicht sichtbar ist oder nicht korrekt geladen werden kann (z.B. 404).
     * @param page Die Playwright Page-Instanz.
     * @param testId Die 'data-testid' des Bildelements.
     * @param timeout_ms Optionaler Timeout in Millisekunden für die Sichtbarkeitsprüfung.
     */
    static async expectImageToBeLoaded(
        page: Page, 
        testId: string, 
        timeout_ms: number = visibilityTimeout_ms
    ): Promise<void> {

        // [Sichtbarkeit prüfen]
        const imageLocator = page.getByTestId(testId);
        await expect(imageLocator, `Das Bild mit der Test-ID '${testId}' sollte sichtbar sein.`).toBeInViewport({ timeout: timeout_ms });

        // [Ladezustand im Browser evaluieren]
        const isImageLoaded = await imageLocator.evaluate(
            (img: HTMLImageElement) => {
                // 'complete' ist true, wenn das Bild heruntergeladen wurde (auch bei Fehler).
                if (!img.complete) {
                    return false;
                }
                // 'naturalWidth' ist > 0, wenn das Bild eine intrinsische Größe hat, was bei einem Ladefehler (z.B. 404) nicht der Fall ist.
                if (img.naturalWidth === 0) {
                    return false;
                }
                return true;
            }
        );

        // [Ergebnis validieren]
        expect(isImageLoaded, `Das Bild mit der Test-ID '${testId}' konnte nicht vollständig geladen werden!`).toBe(true);
    };

    /**
     * Überprüft, ob ein Element sichtbar ist und den erwarteten Text enthält.
     * Der Textvergleich kann entweder als Teilmenge oder als regulärer Ausdruck (RegExp) erfolgen.
     * @param page Die Playwright Page-Instanz.
     * @param testId Die 'data-testid' des Elements.
     * @param expectedTexts Der erwartete Text als string oder RegExp.
     * @param timeout_ms Optionaler Timeout in Millisekunden für die Sichtbarkeitsprüfung.
     */
    static async expectElementToContainText(
        page: Page, 
        testId: string, 
        expectedTexts: string |string[] | RegExp, 
        timeout_ms: number = visibilityTimeout_ms
    ): Promise<void> {

        const elementLocator = page.getByTestId(testId);
        await expect(elementLocator, `Das Element mit der Test-ID '${testId}' sollte sichtbar sein.`).toBeInViewport({ timeout: timeout_ms });
        await expect(elementLocator).toContainText(expectedTexts);
    }

    /**
     * Überprüft, ob ein Element sichtbar ist und den erwarteten Text enthält.
     * Der Textvergleich erfolgt als exakte Übereinstimmung (string).
     * @param page Die Playwright Page-Instanz.
     * @param testId Die 'data-testid' des Elements.
     * @param expectedText Der erwartete Text als string.
     * @param timeout_ms Optionaler Timeout in Millisekunden für die Sichtbarkeitsprüfung.
     */
    static async expectElementToHaveText(
        page: Page, 
        testId: string, 
        expectedText: string,
        timeout_ms: number = visibilityTimeout_ms
    ): Promise<void> {

        const elementLocator = page.getByTestId(testId);
        await expect(elementLocator, `Das Element mit der Test-ID '${testId}' sollte sichtbar sein.`).toBeInViewport({ timeout: timeout_ms });

        // Diese Zeile funktioniert nun für beide Typen, ohne weitere Änderung.
        await expect(elementLocator).toHaveText(expectedText);
    }

    /**
     * Erwartet, dass ein Link-Click zu einem bestimmten Abschnitt 
     * auf der Seite führt und die URL und Sichtbarkeit des Abschnittes 
     * stimmen.
     * @param page Die Playwright Page-Instanz.
     * @param role Die Rolle des Links (Standard: "link").
     * @param linkName Der Name des Links.
     * @param dataTestId Die ID des Abschnitts.
     * @param expectedHash Der erwartete Hash-Wert in der URL.
     */
    static async expectSmoothScrollToSection(page: Page, role: string = "link", linkName: string, dataTestId: string, expectedHash: string) {

        const section = page.getByTestId(dataTestId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const link = page.getByRole(role as any, { name: linkName });

        // Hinweis: Eine Vorab-Prüfung "Abschnitt ist noch nicht sichtbar" wäre hier
        // nicht mehr aussagekräftig. Seit dem Redesign füllen die Abschnitte nicht
        // mehr jeweils den gesamten Viewport, benachbarte Abschnitte ragen daher
        // regulär ins Bild. Geprüft wird stattdessen die Wirkung des Klicks.

        // Klick ausführen
        await link.click();
        await this.wait_ms(500);

        // Warten, bis URL und Sichtbarkeit stimmen
        await expect(page).toHaveURL(new RegExp(`${expectedHash}$`));
        await expect(section).toBeInViewport();

        // Der Abschnitt muss tatsächlich an den oberen Rand des Scroll-Containers
        // gescrollt worden sein – sonst würde auch ein wirkungsloser Klick genügen,
        // solange der Abschnitt zufällig schon im Bild liegt.
        // Ausnahme: Der letzte Abschnitt kann nicht weiter nach oben rutschen,
        // wenn der Container bereits am unteren Anschlag steht.
        await expect.poll(
            async () => section.evaluate((element, tolerance) => {
                const scroller = element.closest('main');
                if (!scroller) return 'KEIN_SCROLL_CONTAINER';

                const atBottom = Math.ceil(scroller.scrollTop + scroller.clientHeight) >= scroller.scrollHeight - 2;
                if (atBottom) return 'AM_UNTEREN_ANSCHLAG';

                const offset = element.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
                return Math.abs(offset) <= tolerance
                    ? 'OBEN_AUSGERICHTET'
                    : `ABWEICHUNG_${Math.round(offset)}px`;
            }, scrollAlignTolerance_px),
            {
                timeout: visibilityTimeout_ms,
                message: `Der Abschnitt '${dataTestId}' sollte nach dem Klick oben am Scroll-Container anliegen.`,
            }
        ).toMatch(/^(OBEN_AUSGERICHTET|AM_UNTEREN_ANSCHLAG)$/);
    };

    /**
     * Führt eine Suche auf der Seite aus und überprüft die URL auf die erwartete Such-URL.
     * @param page Die Playwright Page-Instanz.
     * @param dataTestId Die ID des Suchfeldes.
     * @param searchInput Der Suchtext.
     * @param expectedUrl Die erwartete Such-URL (optional, Standard: "/search").
     */
    static async executeSearch(page: Page, dataTestId: string, searchInput: string, expectedUrl: string = "/search"): Promise<void> {
        const searchField = page.getByTestId(dataTestId);

        await searchField.fill(searchInput);
        await searchField.press('Enter');
        await expect(page).toHaveURL(new RegExp(`${expectedUrl}\\?q=${searchInput}`));
    };

    /**
     * Öffnet das Suchfeld durch einen Klick auf den Search-Button.
     * Der Test wartet, bis das Suchfeld sichtbar ist.
     * @param page Die Playwright Page-Instanz.
     * @param searchButtonId Die ID des Search-Buttons.
     * @param searchFieldContainerId Die ID des Containers des Suchfeldes.
     */
    static async openSearchField(page: Page, searchButtonId: string, searchFieldContainerId: string): Promise<void> {
        const searchFieldContainer = page.getByTestId(searchFieldContainerId);
        const searchButton = page.getByTestId(searchButtonId);

        // Suchfeld ist anfangs nicht sichtbar
        await expect(searchFieldContainer).not.toBeInViewport({ timeout: visibilityTimeout_ms });
        // Klick auf den Search-Button
        await expect(searchButton).toBeInViewport();
        await searchButton.click();
        await TestHelpers.wait_ms(500);
        await expect(searchFieldContainer).toBeInViewport({ timeout: visibilityTimeout_ms });
    };


    /**
     * Überprüft, ob ein Element nicht sichtbar ist.
     * Der Test wartet, bis das Element nicht mehr sichtbar ist (oder ein Timeout erreicht wird).
     * @param page Die Playwright Page-Instanz.
     * @param testId Die 'data-testid' des Elements.
     * @param timeout_ms Optionaler Timeout in Millisekunden für die Sichtbarkeitsprüfung.
     */
    static async expectElementToBeHidden(
        page: Page,
        testId: string,
        timeout_ms: number = visibilityTimeout_ms
    ): Promise<void> {
        const elementLocator = page.getByTestId(testId);
        await expect(elementLocator, `Das Element mit der Test-ID '${testId}' sollte nicht sichtbar sein.`)
            .not.toBeHidden({ timeout: timeout_ms });
    };

    /**
     * Überprüft, ob ein Element außerhalb des sichtbaren Bereichs liegt.
     * Der Test wartet, bis das Element nicht mehr sichtbar ist (oder ein Timeout erreicht wird).
     * @param page Die Playwright Page-Instanz.
     * @param testId Die 'data-testid' des Elements.
     * @param timeout_ms Optionaler Timeout in Millisekunden für die Sichtbarkeitsprüfung.
     */
    static async expectElementNotToBeInViewport(
        page: Page,
        testId: string,
        timeout_ms: number = visibilityTimeout_ms
    ): Promise<void> {
        const elementLocator = page.getByTestId(testId);
        await expect(elementLocator, `Das Element mit der Test-ID '${testId}' sollte nicht sichtbar sein.`)
            .not.toBeInViewport({ timeout: timeout_ms });
    };

    /**
     * Öffnet das Mobiles Menü durch einen Klick auf den Menu-Button.
     * Der Test wartet, bis das Mobiles Menü sichtbar ist.
     * @param page Die Playwright Page-Instanz.
     */
    static async openMobileMenu(page: Page): Promise<void> {

        const mobileMenuOpenContainer = page.getByTestId("mobile-menu-open-container");
        // Mobiles Menü öffnen
        const mobileMenuButton = page.getByTestId("mobile-menu-button");
        await mobileMenuButton.click();
        await expect(mobileMenuOpenContainer).toHaveClass(/--visible/);
    };


    /**
     * Überprüft, ob das Suchergebnis-Container sichtbar ist und das Container der gefundenen Blog-Posts sichtbar ist.
     * Der Test wartet, bis die Elemente sichtbar sind (oder ein Timeout erreicht wird).
     * @param page Die Playwright Page-Instanz.
     * @param searchResultsContainerId Die ID des Containers der Suchergebnisse.
     * @param foundBlogPostsContainerId Die ID des Containers der gefundenen Blog-Posts.
     */
    static async checkSearchResults(page: Page, searchResultsContainerId: string, foundBlogPostsContainerId: string): Promise<void> {
        
        const searchResultsContainer = page.getByTestId(searchResultsContainerId);
        await expect(searchResultsContainer).toBeInViewport({ timeout: visibilityTimeout_ms });
        const foundBlogPostsContainer = page.getByTestId(foundBlogPostsContainerId);
        await expect(foundBlogPostsContainer).toBeInViewport({ timeout: visibilityTimeout_ms });
    }
};

