"use client";
import { NavigationBarItemType } from "@/types/NavigationBarTypes";
import { useGlobalState } from '@context/GlobalStateContext';
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/navbar.module.scss";
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from "react";

/**
 * NavigationBar Component
 * Displays a navigation bar with links to different sections of the application.
 * The links are dynamically generated based on the current language setting.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export function NavigationBar(): JSX.Element {
    const { language, setLanguage } = useGlobalState();

    // console.log(`[@NavigationBar] Aktuelle Sprache: "${language}"`);

    console.log(`[@NavigationBar] Navigation-Titel: ${Object.keys(appConstants.navigationTitleTranslations[language])}`); 

    const navBarItems: Array<NavigationBarItemType> = [
        { title: appConstants.navigationTitleTranslations[language].blogs, url: `/${language}/travel-blogs` },
        { title: appConstants.navigationTitleTranslations[language].about, url: `/${language}/about` },        
        { title: appConstants.navigationTitleTranslations[language].contact, url: `/${language}/contact` },      
    ];

    return (
        <nav className={styles.navBar} aria-label="Navigation">
            <div className={styles.navBarLogo}>
                <Link href={`/${language}/`} className={styles.navBarLinkLogo}>
                    <Image 
                        src={appConstants.logoImageProps.src} 
                        alt={appConstants.logoImageProps.alt}
                        className={styles.navBarLogoImage} 
                        width={appConstants.logoImageProps.width} 
                        height={appConstants.logoImageProps.height} />
                </Link>
            </div>
            <ul className={styles.navBarList}>
                {navBarItems.map((item) => (
                    <li key={item.url} className={styles.navBarListItem}>
                        <Link href={item.url} className={styles.navBarLinkItem}>
                            {item.iconPath && (
                                <Image 
                                    src={item.iconPath} 
                                    alt={item.title} 
                                    width={appConstants.navBarIconSize} 
                                    height={appConstants.navBarIconSize} />
                            )}
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}