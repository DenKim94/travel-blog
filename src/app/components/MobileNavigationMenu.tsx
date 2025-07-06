"use client";
import Image from 'next/image';
import { useGlobalState } from '@context/GlobalStateContext';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"
import { MenuBarElements } from "./MenuBarElements";
import { GlobalLanguageSetter } from "./LanguageSetter";
import styles from "@styles/components/mobile-menu.module.scss";



/**
 * Komponente, die die mobile Navigation-Leiste anzeigt.
 *
 * Die Komponente rendert eine Schaltfläche, die die Mobile-Menü-Leiste öffnet, wenn sie angeklickt wird.
 * Sie enthält außerdem die Komponente {@link MenuBarElements}, die die Navigationselemente anzeigt, wenn die Mobile-Menü-Leiste geöffnet ist.
 *
 * @returns {JSX.Element} Die gerenderte Komponente.
 */
export function MobileNavigationMenu(): JSX.Element {
    const { setMenuBarOpen } = useGlobalState();

    function openMenuBar() {
        setMenuBarOpen(true);
    };
    
    return (
        <div className={styles.mobileMenuContainer} id="mobile-menu-container">
            <GlobalLanguageSetter />
            <button className={styles.menuButton} 
                aria-label="Menu Button" onClick={openMenuBar} >
                <Image
                    src={appConstants.navBarIconProps.menu.src}
                    alt={appConstants.navBarIconProps.menu.alt}
                    width={appConstants.navBarIconProps.menu.width}
                    height={appConstants.navBarIconProps.menu.height}
                />
            </button>
            <MenuBarElements />
        </div>
    );
}
