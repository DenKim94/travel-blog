import * as appConstants from "@utils/appConstants"
import { NavigationBarItemType } from '@/types/NavigationBarTypes';
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLanguageFromCookies(cookieStore: any): Promise<string> {
    
  const languageCookie = await cookieStore.get(appConstants.storageSettings.storageKey);
  
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
 * Falls der User nicht auf der Hauptseite ist, wird zuerst zur Hauptseite navigiert.
 * 
 * @param targetId - Die ID des Ziels, zu dem gescrollt werden soll.
 * @param headerHeight - Die Höhe des Headers, der von der Scroll-Position abgezogen werden soll.
 * @param clickEvent - Das Event, das den Link-Click auslöst.
 * @param router - Next.js Router für Navigation (optional)
 * @param currentPath - Der aktuelle Pfad (optional)
 */
export function handleSmoothScroll (
    targetId: string, 
    headerHeight: number = 0, 
    clickEvent: React.MouseEvent<HTMLAnchorElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router?: any,
    currentPath?: string) {

    clickEvent.preventDefault();
    
    const sectionId = clickEvent.currentTarget?.getAttribute('href')?.replace('#', '') || targetId;
    const currentPathname = currentPath || window.location.pathname;
    const isOnHomePage = /^\/[a-z]{2}\/?$/.test(currentPathname); 

    if (!isOnHomePage) {
        
        const lang = currentPathname.split('/')[1] || 'de';
        const homeUrl = `/${lang}/`;
        
        if (router) {
            router.push(homeUrl);
        } else {
            window.location.href = homeUrl;
        }
        return;
    }

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
            filteredImageProps = {
                name: "original",
                hash: imageProps.hash || "",
                ext: imageProps.extension || "",
                mime: "",
                path: "",
                width: imageProps.width,
                height: imageProps.height,
                size: null,
                sizeInBytes: null,
                url: imageProps.url || "",
                alternativeText: imageProps.alternativeText || ""
            };
            break;

        case 'thumbnail':
            if (imageProps.formats?.thumbnail) {
                filteredImageProps = {
                    ...imageProps.formats.thumbnail,
                    url: imageProps.url || "",
                    alternativeText: imageProps.alternativeText
                };
            }
            break;

        case 'small':
                if (imageProps.formats?.small) {
                    filteredImageProps = {
                    ...imageProps.formats.small,
                    url: imageProps.url || "",
                    alternativeText: imageProps.alternativeText
                };
            }
            break;

        case 'medium':
            if (imageProps.formats?.medium) {
                filteredImageProps = {
                    ...imageProps.formats.medium,
                    url: imageProps.url || "",
                    alternativeText: imageProps.alternativeText
                };
            break;
            }

        case 'large':
            if (imageProps.formats?.large) {
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

export function mockDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}