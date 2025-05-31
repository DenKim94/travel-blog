import * as appConstants from "@utils/appConstants"
import { NavigationBarItemType } from '@/types/NavigationBarTypes';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

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
    const navBarItems: Array<NavigationBarItemType> = Object.entries(navigationIds).map(([key, value]) => (
        {
            title: navigationTitleTranslations[language][key as keyof typeof navigationTitleTranslations[typeof language]],
            id: `${value}`,
            route: `${baseURL}${value}`
        }
    ));

    return navBarItems;
}

export function getLanguageFromCookies(cookieStore: ReadonlyRequestCookies): string {
  const languageCookie = cookieStore.get(appConstants.storageSettings.storageKey);
  
  if (languageCookie?.value && isSupportedLanguage(languageCookie.value)) {
    return languageCookie.value;
  }
  
  return appConstants.defaultLanguage;
}

export function setLanguageCookie(language: string) {
  if (typeof window !== 'undefined') {
    document.cookie = `${appConstants.storageSettings.storageKey}=${language}; path=${appConstants.storageSettings.path}; max-age=${appConstants.storageSettings.maxAge}; SameSite=${appConstants.storageSettings.sameSite}`;
  }
}