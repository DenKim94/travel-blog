"use client";
import { NavigationBarItemType } from "@/types/NavigationBarTypes";
import { useGlobalState } from '@context/GlobalStateContext';
import * as appConstants from "@utils/appConstants"
import * as helperFunctions from "@utils/helperFunctions"
import styles from "@styles/components/navbar.module.scss";
import variables from "@styles/variables.module.scss";
import Image from 'next/image';
import { JSX, useMemo } from "react";
import { SearchButton } from "./SearchModule";

/**
 * NavigationBar Component
 * Displays a navigation bar with links to different sections of the application.
 * The links are dynamically generated based on the current language setting.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export function NavigationBar(): JSX.Element {
    const { language } = useGlobalState();

    const navBarItems: NavigationBarItemType[] = useMemo(() => {
        return helperFunctions.getNavigationItems(language);
    }, [language]);

    const headerHeight = parseInt(variables.headerHeight, 10);

    /**
     * Handles smooth scrolling to target sections
     * @param targetId - The ID of the target section
     * @param event - The click event
     */
    function handleSmoothScroll (targetId: string, event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();

        const sectionId = event.currentTarget?.getAttribute('href')?.replace('#', '') || targetId;
        const targetElement = document.getElementById(sectionId);

        if (!targetElement) {
            console.warn(`Could not find element with ID: "${sectionId}"`);
            return;
        }

        // Calculate position with header offset
        const targetPosition = targetElement.offsetTop - headerHeight;

        targetElement?.scrollIntoView({ block: 'start' });

        window.scrollTo({
            top: Math.max(0, targetPosition), // Ensure we don't scroll above page top
            behavior: 'smooth'
        });
    }

    return (
        <nav className={styles.navBar} aria-label="Navigation">
            <div className={styles.navBarLogo}>
                <a href={`/${language}/`}>
                    <Image 
                        src={appConstants.appLogoImageProps.src} 
                        alt={appConstants.appLogoImageProps.alt}
                        className={styles.navBarLogoImage} 
                        width={appConstants.appLogoImageProps.width} 
                        height={appConstants.appLogoImageProps.height} 
                        priority={true}
                    />
                </a>
            </div>
            
            {/* Navigation Items */}
            <ul className={styles.navBarList} role="menubar">
                {navBarItems.map((item) => (
                    <li key={item.title} className={styles.navBarListItem}>
                        <a href={`#${item.id}`}
                            className={styles.navBarLinkItem}
                            role="menuitem"
                            tabIndex={0}
                            aria-label={item.title}
                            onClick={(e) => handleSmoothScroll(item.id, e)}>
                            {item.title}
                        </a>
                    </li>
                ))}
                {/* Search Functionality */}
                <SearchButton />
            </ul>
        </nav>
    );
}