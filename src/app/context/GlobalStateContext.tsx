"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as appConstants from "@utils/appConstants"
import * as helperFunctions from "@utils/helperFunctions"

type GlobalStateContextType = {
    language: appConstants.SupportedLanguageType;
    setLanguage: (language: appConstants.SupportedLanguageType) => void;
};

const GlobalStateContext = createContext<GlobalStateContextType>({
    language: appConstants.defaultLanguage,
    setLanguage: () => {},
});

export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
};

export function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<appConstants.SupportedLanguageType>(appConstants.defaultLanguage);

    // Beim ersten Laden prüfen, ob eine gespeicherte Sprache im Cache existiert
    useEffect(() => {
        const savedLanguage = localStorage.getItem("preferred-language");
        if (savedLanguage && helperFunctions.isSupportedLanguage(savedLanguage)) {
            setLanguageState(savedLanguage as appConstants.SupportedLanguageType);
        }
    }, []);

    // Funktion zum Ändern und Cachen der Sprache
    const setLanguage = (language: appConstants.SupportedLanguageType) => {
        setLanguageState(language);
        localStorage.setItem("preferred-language", language);
    };

    // Context-Wert
    const value = {
        language,
        setLanguage,
    };

    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    );
}