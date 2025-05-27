import * as appConstants from "@utils/appConstants"
import { NavigationBarItemType } from '@/types/NavigationBarTypes';

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

    const baseUrl: string = `/${language}`
    const { navigationTitleTranslations, navigationRoutes } = appConstants;

    const navBarItems: Array<NavigationBarItemType> = Object.entries(navigationRoutes).map(([key, value]) => (
        {
            title: navigationTitleTranslations[language][key as keyof typeof navigationTitleTranslations[typeof language]],
            route: `${baseUrl}/${value}`
        }
    ));

    return navBarItems;
}