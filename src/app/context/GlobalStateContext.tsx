"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as appConstants from "@utils/appConstants"
import * as helperFunctions from "@utils/helperFunctions"

type GlobalStateContextType = {
    language: appConstants.SupportedLanguageType;
    setLanguage: (language: appConstants.SupportedLanguageType) => void;
    searchFieldOpen: boolean;
    setSearchFieldOpen: (open: boolean) => void; 
    menuBarOpen: boolean,
    setMenuBarOpen: (open: boolean) => void; 
    isOnSearchPage: boolean,
    setIsOnSearchPage: (open: boolean) => void
};

const GlobalStateContext = createContext<GlobalStateContextType>({
    language: appConstants.defaultLanguage,
    setLanguage: () => {},
    searchFieldOpen: false,
    setSearchFieldOpen: () => {},
    menuBarOpen: false,
    setMenuBarOpen: () => {},
    isOnSearchPage: false, 
    setIsOnSearchPage: () => {}
});

/**
 * Holt den aktuellen Zustand des GlobalStateContext und gibt ihn zurück.
 * Muss innerhalb eines GlobalStateProvider verwendet werden.
 * 
 * @returns Der aktuelle Zustand des GlobalStateContext.
 * @throws {Error} Wenn useGlobalState außerhalb eines GlobalStateProvider verwendet wird.
 */
export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
};

interface GlobalStateProviderProps {
  children: ReactNode;
  initialLanguage?: string;
}

/**
 * GlobalStateProvider-Komponente, die den GlobalStateContext bereitstellt.
 * 
 * Die GlobalStateProvider-Komponente ist ein Context-Provider, der den
 * GlobalStateContext für die Anwendung bereitstellt. Der Context enthält
 * den aktuellen Sprachzustand und Funktionen, um ihn zu ändern.
 * 
 * @param {ReactNode} children - Die Kinder-Komponenten, die innerhalb
 *                               des GlobalStateContext verfügbar sein
 *                               sollen.
 * @param {string} [initialLanguage=appConstants.defaultLanguage] - Die
 *                                               anfängliche Sprache, die
 *                                               verwendet werden soll.
 * @returns - Die JSX-Elemente der GlobalStateProvider-Komponente.
 */
export function GlobalStateProvider({ children, initialLanguage = appConstants.defaultLanguage }: GlobalStateProviderProps) {
    const [language, setLanguageState] = useState<appConstants.SupportedLanguageType>(initialLanguage as appConstants.SupportedLanguageType);
    const [searchFieldOpen, setSearchFieldOpen] = useState<boolean>(false);
    const [menuBarOpen, setMenuBarOpen] = useState<boolean>(false);
    const [isOnSearchPage, setIsOnSearchPage] = useState<boolean>(false);

    // Beim ersten Laden prüfen, ob eine gespeicherte Sprache im Cache existiert
    useEffect(() => {
        const savedLanguage = localStorage.getItem(appConstants.storageSettings.storageKey);
        if (savedLanguage && helperFunctions.isSupportedLanguage(savedLanguage)) {
            setLanguageState(savedLanguage as appConstants.SupportedLanguageType);
            helperFunctions.setLanguageCookie(savedLanguage);
        }
    }, [initialLanguage]);
  
    // Funktion zum Ändern und Cachen der Sprache
    const setLanguage = (language: appConstants.SupportedLanguageType) => {
        setLanguageState(language);
        localStorage.setItem(appConstants.storageSettings.storageKey, language);
        helperFunctions.setLanguageCookie(language);
    };

    // Context-Wert
    const value = {
        language,
        setLanguage,
        searchFieldOpen,
        setSearchFieldOpen,
        menuBarOpen,
        setMenuBarOpen,
        isOnSearchPage, 
        setIsOnSearchPage
    };

    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    );
}