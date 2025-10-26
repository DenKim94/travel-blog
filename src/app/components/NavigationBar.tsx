"use client";
import { NavigationBarItemType } from "@/types/NavigationBarTypes";
import { useIsOnBlogPage, useIsOnImprintPage, useIsOnSearchPage } from "@/hooks/usePageTracker";
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


interface NavigationBarProps {
  language: appConstants.SupportedLanguageType;
}

/**
 * Komponente, die die Navigation-Leiste anzeigt.
 *
 * Die Komponente rendert die Navigationselemente je nach aktuell ausgewählter Sprache.
 * Sie enthält außerdem eine Suchfunktion und ein Dropdown-Menü für die Sprache.
 *
 * Die Komponente verwendet die Hook useWindowSize, 
 * um die aktuelle Bildschirmgröße zu ermitteln und ggf. die mobile Navigation-Leiste anzuzeigen, 
 * wenn die Bildschirmgröße kleiner oder gleich der angegebenen mobileHeaderWidth ist.
 *
 * @returns {JSX.Element} Die gerenderte Komponente.
 */
export function NavigationBar({ language }: NavigationBarProps): JSX.Element {

    const isOnSearchPage = useIsOnSearchPage();
    const isOnBlogPage = useIsOnBlogPage();
    const isOnImprintPage = useIsOnImprintPage();
    
    const navBarItems: NavigationBarItemType[] = useMemo(() => {
        return helperFunctions.getNavigationItems(language);
    }, [language]);

    const headerHeight = parseInt(variables.headerHeight, 10);
    const { width: windowWidth } = useWindowSize({ debounceDelay: appConstants.windowUpdateDelay_ms });
    const isMobile = windowWidth <= parseInt(variables.mobileHeaderWidth, 10);

    return (
        <nav className={styles.navBar} 
            aria-label="Navigation" 
            id="navigation-bar-container"
            data-testid="navigation-bar-container">
            {/* Application Logo */}
            <div className={styles.navBarLogo} data-testid="navigation-bar-logo">
                <a href={`/${language}/`}>
                    <Image 
                        src={appConstants.appLogoImageProps.src} 
                        alt={appConstants.appLogoImageProps.alt}
                        className={styles.navBarLogoImage} 
                        width={appConstants.appLogoImageProps.width} 
                        height={appConstants.appLogoImageProps.height} 
                        priority={true}
                        loading="eager"
                    />
                </a>
            </div>
            {isMobile && !isOnImprintPage && (
                <MobileNavigationMenu language={language} /> 
            )}            
            {/* Navigation Items */}
            <ul className={`${styles.navBarList} ${isMobile ? styles['navBarList--hidden'] : styles['navBarList--visible']}`} 
                role="menubar" aria-label="Navigation Menu">

                {!isOnSearchPage && !isOnImprintPage && navBarItems?.map((item) => (
                    <li key={item.title} className={styles.navBarListItem}>
                        <a href={`#${item?.id}`}
                            className={styles.navBarLinkItem}
                            role="menuitem"
                            tabIndex={0}
                            aria-label={item.title}
                            onClick={(e) => helperFunctions.handleSmoothScroll(item.id, headerHeight, e)}>

                            {item.title?.toUpperCase()}
                        </a>
                    </li>
                ))}
                {/* Search Functionality */}
                {!isOnImprintPage && <SearchButton />}
                {/* Language Selector */}
                {!isOnBlogPage && !isOnSearchPage && <GlobalLanguageSetter language={language} />}
            </ul>
        </nav>
    );
}