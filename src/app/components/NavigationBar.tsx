"use client";
import { NavigationBarItemType } from "@/types/NavigationBarTypes";
import { useGlobalState } from '@context/GlobalStateContext';
import * as appConstants from "@utils/appConstants"
import * as helperFunctions from "@utils/helperFunctions"
import styles from "@styles/components/navbar.module.scss";
import Image from 'next/image';
import Link from 'next/link';
import { JSX, useMemo } from "react";

/**
 * NavigationBar Component
 * Displays a navigation bar with links to different sections of the application.
 * The links are dynamically generated based on the current language setting.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export function NavigationBar(): JSX.Element {
    const { language, setLanguage } = useGlobalState();

    const navBarItems: NavigationBarItemType[] = useMemo(() => {
        return helperFunctions.getNavigationItems(language);
    }, [language]);

    return (
        <nav className={styles.navBar} aria-label="Navigation">
            <div className={styles.navBarLogo}>
                <Link href={`/${language}/`} className={styles.navBarLinkLogo}>
                    <Image 
                        src={appConstants.appLogoImageProps.src} 
                        alt={appConstants.appLogoImageProps.alt}
                        className={styles.navBarLogoImage} 
                        width={appConstants.appLogoImageProps.width} 
                        height={appConstants.appLogoImageProps.height} 
                        priority={true}
                    />
                </Link>
            </div>
            {/* Navigation Items */}
            <ul className={styles.navBarList}>
                {navBarItems.map((item) => (
                    <li key={item.title} className={styles.navBarListItem}>
                        <Link href={item.route} className={styles.navBarLinkItem}>
                            {item.title}
                        </Link>
                    </li>
                ))}
                {/* Search Functionality */}
                <div className="search-container">
                    <Image 
                        src={appConstants.navBarIconProps.search.src} 
                        alt={appConstants.navBarIconProps.search.alt}
                        className={styles.navBarLogoImage} 
                        width={appConstants.navBarIconProps.search.width} 
                        height={appConstants.navBarIconProps.search.height} 
                    />
                </div>
            </ul>
        </nav>
    );
}