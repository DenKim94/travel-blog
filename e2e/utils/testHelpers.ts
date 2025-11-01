import { Page, expect } from '@playwright/test';
import { visibilityTimeout_ms } from './testParameters';

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
        await expect(imageLocator, `Das Bild mit der Test-ID '${testId}' sollte sichtbar sein.`).toBeVisible({ timeout: timeout_ms });

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

    static async expectElementToContainText(
        page: Page, 
        testId: string, 
        expectedTexts: string[] | RegExp, 
        timeout_ms: number = visibilityTimeout_ms
    ): Promise<void> {

        const elementLocator = page.getByTestId(testId);
        await expect(elementLocator, `Das Element mit der Test-ID '${testId}' sollte sichtbar sein.`).toBeVisible({ timeout: timeout_ms });
        await expect(elementLocator).toContainText(expectedTexts);
    }

    /**
     * Überprüft, ob ein Element sichtbar ist und den erwarteten Text enthält.
     * Der Textvergleich kann entweder als exakte Übereinstimmung (string) oder als regulärer Ausdruck (RegExp) erfolgen.
     * @param page Die Playwright Page-Instanz.
     * @param testId Die 'data-testid' des Elements.
     * @param expectedText Der erwartete Text als string oder RegExp.
     * @param timeout_ms Optionaler Timeout in Millisekunden für die Sichtbarkeitsprüfung.
     */
    static async expectElementToHaveText(
        page: Page, 
        testId: string, 
        expectedText: string,
        timeout_ms: number = visibilityTimeout_ms
    ): Promise<void> {

        const elementLocator = page.getByTestId(testId);
        await expect(elementLocator, `Das Element mit der Test-ID '${testId}' sollte sichtbar sein.`).toBeVisible({ timeout: timeout_ms });

        // Diese Zeile funktioniert nun für beide Typen, ohne weitere Änderung.
        await expect(elementLocator).toHaveText(expectedText);
    }
}

