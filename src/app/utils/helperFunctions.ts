import * as appConstants from "@utils/appConstants"
import { NavigationBarItemType } from '@/types/NavigationBarTypes';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { StrapiImage, StrapiImageFormat } from "@/types/strapiTypes";

/**
Überprüft, ob eine gegebene Sprache in der Liste der unterstützten Sprachen enthalten ist.
@param {string} lang - Die zu überprüfende Sprache.
@returns {boolean} - true, wenn die Sprache unterstützt wird, sonst false
@property {SupportedLanguageType[]} supportedLanguages - Liste der unterstützten Sprachen aus appConstants. 
typedef e.g. {("de"|"en"|"fr"|"es"|"it")} SupportedLanguageType
*/
export function isSupportedLanguage(lang: string): lang is appConstants.SupportedLanguageType {
    return appConstants.supportedLanguages.includes(lang as appConstants.SupportedLanguageType);
}

/**
 * Generiert Navigation-Items basierend auf der aktuellen Sprache
 * 
 * @param language - Die aktuelle Sprache
 * @returns Array von NavigationBarItemType
 */
export function getNavigationItems(
    language: appConstants.SupportedLanguageType,
): Array<NavigationBarItemType> {

    const { navigationTitleTranslations, navigationIds } = appConstants;
    const baseURL = `/${language}/`; // Basis-URL für die Navigation

    // Prüfung ob die Sprache im Übersetzungsobjekt existiert
    if (!navigationTitleTranslations[language]) {
        console.error("Ungültige Sprache: ", language);
        return []; // Oder Fallback-Werte zurückgeben
    }

    const navBarItems: Array<NavigationBarItemType> = Object.entries(navigationIds).map(([key, value]) => (
        {
            title: navigationTitleTranslations[language][key as keyof typeof navigationTitleTranslations[typeof language]],
            id: `${value}`,
            route: `${baseURL}${value}`
        }
    ));

    return navBarItems;
}

/**
 * Holt die aktuelle Sprache aus den Cookies.
 * Wenn die Sprache nicht gesetzt wurde oder ungültig ist,
 * wird die Standardsprache zurückgegeben.
 * 
 * @param cookieStore - Ein Objekt, das die Cookies enthält
 * @returns Die aktuelle Sprache
 */
export function getLanguageFromCookies(cookieStore: ReadonlyRequestCookies): string {
  const languageCookie = cookieStore.get(appConstants.storageSettings.storageKey);
  
  if (languageCookie?.value && isSupportedLanguage(languageCookie.value)) {
    return languageCookie.value;
  }
  
  return appConstants.defaultLanguage;
}

/**
 * Setzt einen Cookie, der die bevorzugte Sprache des Benutzers angibt.
 * @param language - Die zu setzende Sprache.
 */
export function setLanguageCookie(language: string) {
  if (typeof window !== 'undefined') {
    document.cookie = `${appConstants.storageSettings.storageKey}=${language}; path=${appConstants.storageSettings.path}; max-age=${appConstants.storageSettings.maxAge}; SameSite=${appConstants.storageSettings.sameSite}`;
  }
}

/**
 * Die Funktion übernimmt das Scrollen zu einem bestimmten Element auf der Seite.
 * 
 * @param targetId - Die ID des Ziels, zu dem gescrollt werden soll.
 * @param headerHeight - Die Höhe des Headers, der von der Scroll-Position
 *                       abgezogen werden soll. Defaultwert ist 0.
 * @param clickEvent - Das Event, das den Link-Click auslöst.
 */
export function handleSmoothScroll (targetId: string, headerHeight: number = 0, clickEvent: React.MouseEvent<HTMLAnchorElement>) {
    clickEvent.preventDefault();
    
    const sectionId = clickEvent.currentTarget?.getAttribute('href')?.replace('#', '') || targetId;
    const targetElement = document.getElementById(sectionId);

    if (!targetElement) {
        console.warn(`Could not find element with ID: "${sectionId}"`);
        return;
    }

    // Header offset
    const targetPosition = targetElement.offsetTop - headerHeight;

    targetElement?.scrollIntoView({ block: 'start' });

    window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
    });
}

/**
 * Gibt die passenden Bilddaten für die Landingpage basierend auf der Bildbreite und dem gewünschten Format zurück.
 * 
 * @param imageProps - Die Bilddaten als Array, die geprüft werden sollen
 * @param format - Das gewünschte Format ('desktop' oder 'mobile')
 * @returns Die passenden Bild-Props, wenn die Bedingung erfüllt ist, sonst null
 */
export function getLandingPageImagePropsByFormat(
  imageProps: Array<StrapiImage> | undefined, 
  format: 'desktop' | 'mobile'
): StrapiImage | null {
    
  if (format === 'desktop') {
    return imageProps?.find(img => img.width >= appConstants.LANDING_PAGE_IMG_WIDTH_THRESHOLD) || null;
  } else {
    return imageProps?.find(img => img.width < appConstants.LANDING_PAGE_IMG_WIDTH_THRESHOLD) || null;
  }
}

/**
 * Gibt die passenden Bild-Eigenschaften basierend auf dem Format zurück.
 *
 * Die Funktion überprüft, ob die Bild-Eigenschaften für das angegebene Format
 * vorhanden sind und gibt diese zurück.
 *
 * @param {StrapiImage} imageProps - Die Bilddaten, die geprüft werden sollen.
 * @param {'original'|'thumbnail'|'small'|'medium'|'large'} format - Das gewünschte Format.
 * @returns {StrapiImageFormat | null} - Die passenden Bild-Eigenschaften, wenn die Bedingung erfüllt ist, sonst null.
 */
export function getImagePropsByFormat(imageProps: StrapiImage | undefined | null, 
                format: 'original' | 'thumbnail' | 'small' | 'medium' | 'large')
: StrapiImageFormat | null {

    if (!imageProps) {
        return null;
    }
    let filteredImageProps: StrapiImageFormat | null = null;

    switch (format) {
        case 'original':
            // Return the original image properties
            filteredImageProps = {
                name: "original",
                hash: imageProps.hash || "",
                ext: imageProps.extension || "",
                mime: "",
                path: "",
                width: imageProps.width,
                height: imageProps.height ,
                size: null,
                sizeInBytes: null,
                url: imageProps.url || "",
                alternativeText: imageProps.alternativeText || ""
            };
            break;

        case 'thumbnail':
            if (imageProps.formats.thumbnail) {
                filteredImageProps = {
                    ...imageProps.formats.thumbnail,
                    url: imageProps.url || "",
                    alternativeText: imageProps.alternativeText
                };
            }
            break;

        case 'small':
                if (imageProps.formats.small) {
                    filteredImageProps = {
                    ...imageProps.formats.small,
                    url: imageProps.url || "",
                    alternativeText: imageProps.alternativeText
                };
            }
            break;

        case 'medium':
            if (imageProps.formats.medium) {
                filteredImageProps = {
                    ...imageProps.formats.medium,
                    url: imageProps.url || "",
                    alternativeText: imageProps.alternativeText
                };
            break;
            }

        case 'large':
            if (imageProps.formats.large) {
                filteredImageProps = {
                    ...imageProps.formats.large,
                    url: imageProps.url || "",
                    alternativeText: imageProps.alternativeText
                };
            }
            break;
    }

    return filteredImageProps;
}