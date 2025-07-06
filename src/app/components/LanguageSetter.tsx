"use client";
import { JSX, useRef, useState, useEffect } from "react";
import { useGlobalState } from '@context/GlobalStateContext';
import { useRouter, usePathname } from 'next/navigation';
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/language-setter.module.scss";


/**
 * Globale Komponente, die die aktuelle Sprache anzeigt und erlaubt, die Sprache zu ändern.
 * 
 * @param {Object} languageOptions - Ein Objekt, das die verschiedenen Sprachoptionen enthält.
 *                                    Die Schlüssel sind die Sprachkürzel, die Werte sind Objekte mit
 *                                    den Eigenschaften `shortName` und `longName`.
 *                                    Standardmäßig wird `appConstants.languageOptions` verwendet.
 * 
 * @returns {JSX.Element} - Die JSX-Elemente der Komponente.
 */
export function GlobalLanguageSetter({languageOptions = appConstants.languageOptions}: 
    {languageOptions?: typeof appConstants.languageOptions}): JSX.Element {

    const { language, setLanguage } = useGlobalState();
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Schließe Dropdown bei Klick außerhalb
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);    

    function handleLanguageChange(language: appConstants.SupportedLanguageType): void {
        try {
            setLanguage(language);
            setIsOpen(false);

            // URL für neue Sprache rekonstruieren
            const currentPathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '') || '/';
            const newPath = `/${language}${currentPathWithoutLang}`;

            router.push(newPath);
            router.refresh(); // Erzwingt Server-Side Re-Rendering

        } catch (error) {
            console.error("Error at setting language:", error);
        }
    };

    // Keyboard Navigation
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen(!isOpen);
        } else if (event.key === 'Escape') {
            setIsOpen(false);
        }
    }

    const currentLanguageOption = languageOptions[language];

    return (
        <div className={styles.languageSetter} ref={dropdownRef} id="language-setter-container">
            <div 
                className={`${styles.languageSelector} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                id="language-selector"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="Sprache auswählen"
            >
                <span className={styles.selectedLanguage}>
                    {currentLanguageOption?.shortName}
                </span>
                <span className={`${styles.dropdownArrow} ${isOpen ? styles.rotated : ''}`}>
                    ▼
                </span>
            </div>
            
            {isOpen && (
                <div className={styles.languageDropdown} role="listbox" id="language-options">
                    {Object.entries(languageOptions).map(([key, {shortName, longName}]) => (
                        <div
                            key={key}
                            className={`${styles.languageOption} ${key === language ? styles.selected : ''}`}
                            onClick={() => handleLanguageChange(key as appConstants.SupportedLanguageType)}
                            role="option"
                            aria-selected={key === language}
                            id={`language-option-${key}`}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleLanguageChange(key as appConstants.SupportedLanguageType);
                                }
                            }}
                        >
                            <span className={styles.languageName}>{shortName} - {longName}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

