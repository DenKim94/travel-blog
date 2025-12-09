"use client";
import Image from 'next/image';
import { useGlobalState } from '@context/GlobalStateContext';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"
import { MenuBarElements } from "./MenuBarElements";
import { GlobalLanguageSetter } from "./LanguageSetter";
import styles from "@styles/components/mobile-menu.module.scss";
import { useScrollLock } from '@hooks/useScrollLock';
import { useIsOnBlogPage, useIsOnSearchPage } from '@/hooks/usePageTracker';


/**
 * Komponente, die die mobile Navigation-Leiste anzeigt.
 *
 * Die Komponente rendert eine Schaltfläche, die die Mobile-Menü-Leiste öffnet, wenn sie angeklickt wird.
 * Sie enthält außerdem die Komponente {@link MenuBarElements}, die die Navigationselemente anzeigt, wenn die Mobile-Menü-Leiste geöffnet ist.
 *
 * @returns {JSX.Element} Die gerenderte Komponente.
 */
export function MobileNavigationMenu({language}: {language: string}): JSX.Element {
    const { menuBarOpen, setMenuBarOpen } = useGlobalState();
    const isOnBlogPage = useIsOnBlogPage();
    const isOnSearchPage = useIsOnSearchPage();
    useScrollLock(menuBarOpen);

    function openMenuBar() {
        setMenuBarOpen(true);
    };
    
    return (
        <div className={styles.mobileMenuContainer} 
            id="mobile-menu-container"
            data-testid="mobile-menu-container">

            {!isOnBlogPage && !isOnSearchPage && <GlobalLanguageSetter language={language} testId="global-language-setter-mobile"/>}
            <button className={styles.menuButton} 
                    aria-label="Menu Button" 
                    data-testid="mobile-menu-button"
                    onClick={openMenuBar} >
                <Image
                    src={appConstants.navBarIconProps.menu.src}
                    alt={appConstants.navBarIconProps.menu.alt}
                    width={appConstants.navBarIconProps.menu.width}
                    height={appConstants.navBarIconProps.menu.height}
                    loading="eager"
                    data-testid="mobile-menu-icon"
                />
            </button>
            <MenuBarElements />
        </div>
    );
}
