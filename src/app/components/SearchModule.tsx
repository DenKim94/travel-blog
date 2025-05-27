"use client"
import styles from "@styles/components/search.module.scss";
import { useGlobalState } from '@/context/GlobalStateContext';
import Image from 'next/image';
import * as appConstants from "@utils/appConstants"
import { JSX, useState } from "react";

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

export function SearchField(): JSX.Element {
    const { language, searchFieldOpen } = useGlobalState();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
       <>
       {searchFieldOpen && (
            <div className={styles.searchFieldContainer}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={appConstants.searchTitleTranslations[language].title}
                    className={styles.searchInput}
                />
            </div>
        )}  
        </>  
    );
}