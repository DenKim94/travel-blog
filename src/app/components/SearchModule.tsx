"use client"
import styles from "@styles/components/search.module.scss";
import { useGlobalState } from '@/context/GlobalStateContext';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import Image from 'next/image';
import * as appConstants from "@utils/appConstants"
import { JSX, useState, useEffect, useRef } from "react";

export function SearchButton(): JSX.Element {
    const { searchFieldOpen, setSearchFieldOpen } = useGlobalState();

    function toggleSearchField() {
        setSearchFieldOpen(!searchFieldOpen);
    }

    return (
        <button className={styles.searchButton} aria-label="Search" onClick={toggleSearchField} >
            <Image
                src={appConstants.navBarIconProps.search.src}
                alt={appConstants.navBarIconProps.search.alt}
                className={styles.searchIcon}
                width={appConstants.navBarIconProps.search.width}
                height={appConstants.navBarIconProps.search.height}
            />
        </button>
    );
}

export function SearchField(): JSX.Element | null {
    const { language, searchFieldOpen, setSearchFieldOpen } = useGlobalState();
    const [searchQuery, setSearchQuery] = useState("");
    const [shouldRender, setShouldRender] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const searchFieldRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const debouncedQuery = useDebouncedValue(searchQuery, appConstants.debounceDelay);

    // Komponente mounten wenn geöffnet wird
    useEffect(() => {
        if (searchFieldOpen) {
            setShouldRender(true);
            // Kurze Verzögerung, damit das Element erst gerendert wird, dann animiert
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, appConstants.setAnimationDelay);

            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
        }
    }, [searchFieldOpen]);

    // Komponente nach Animation unmounten
    useEffect(() => {
        if (!searchFieldOpen && !isAnimating) {
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, appConstants.transitionDuration); // Entspricht der Transition-Dauer
            return () => clearTimeout(timer);
        }

    }, [searchFieldOpen, isAnimating]);

    // Focus setzen nach Animation
    useEffect(() => {
        if (isAnimating && searchFieldRef.current) {
            searchFieldRef.current.focus();
        }
    }, [isAnimating]);

    useEffect(() => {
        if (debouncedQuery) {
            // Suche oder API-Call nur mit debouncedQuery ausführen!
            // To-Do: API-Call mit debouncedQuery
            console.log(`> Suchbegriff: "${debouncedQuery}"`);
        }
    }, [debouncedQuery]);

    // Klick außerhalb erkennen und Suchfeld schließen
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                closeSearchField();
            }
            }

            if (searchFieldOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchFieldOpen]);

    function handleSearchChange (event: React.ChangeEvent<HTMLInputElement>){
        setSearchQuery(event.target.value);
    };

    function closeSearchField() {
        setSearchQuery("");         // Suchfeld zurücksetzen
        setSearchFieldOpen(false);  // Suchfeld schließen
    }

    if (!shouldRender) {
        return null;
    }

    return (
            <div className={`${styles.searchFieldContainer} ${isAnimating ? styles.open : ""}`} ref={modalRef}>
                <input
                    ref = {searchFieldRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={appConstants.searchTitleTranslations[language].title}
                    className={styles.searchInput}
                />
                <button
                    className={styles.searchCloseButton}
                    onClick={closeSearchField}
                    aria-label="Suche schließen"
                >
                    <Image
                        src={appConstants.navBarIconProps.close_search_field.src}
                        alt={appConstants.navBarIconProps.close_search_field.alt}
                        className={styles.searchCloseIcon}
                        width={appConstants.navBarIconProps.close_search_field.width}
                        height={appConstants.navBarIconProps.close_search_field.height}
                    />
                </button>
            </div>
    );
}