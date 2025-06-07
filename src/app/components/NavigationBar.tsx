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
import { GlobalLanguageSetter } from "./LanguageSetter";
import { MobileNavigationMenu } from "./MobileNavigationMenu";
import useWindowSize from "@/hooks/useWindowSize";

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
    const { width: windowWidth } = useWindowSize({ debounceDelay: appConstants.windowUpdateDelay_ms });
    const isMobile = windowWidth <= parseInt(variables.mobileHeaderWidth, 10);

    return (
        <nav className={styles.navBar} aria-label="Navigation">
            {/* Application Logo */}
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
            {isMobile && (
                <MobileNavigationMenu /> 
            )}            
            {/* Navigation Items */}
            <ul className={`${styles.navBarList} ${isMobile ? styles['navBarList--hidden'] : styles['navBarList--visible']}`} 
                role="menubar" aria-label="Navigation Menu">

                {navBarItems?.map((item) => (
                    <li key={item.title} className={styles.navBarListItem}>
                        <a href={`#${item.id}`}
                            className={styles.navBarLinkItem}
                            role="menuitem"
                            tabIndex={0}
                            aria-label={item.title}
                            onClick={(e) => helperFunctions.handleSmoothScroll(item.id, headerHeight, e)}>
                            {item.title.toUpperCase()}
                        </a>
                    </li>
                ))}
                {/* Search Functionality */}
                <SearchButton />
                {/* Language Selector */}
                <GlobalLanguageSetter />
            </ul>
        </nav>
    );
}