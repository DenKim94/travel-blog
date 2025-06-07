"use client";
import Image from 'next/image';
import { useGlobalState } from '@context/GlobalStateContext';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"
// import * as helperFunctions from "@utils/helperFunctions"
import { MenuBarElements } from "./MenuBarElements";
import styles from "@styles/components/mobile-menu.module.scss";


/**
 * MobileNavigationMenu Component
 * Displays a button with a menu icon. When clicked, the menu bar will be opened.
 * The menu bar is rendered as a child component of MobileNavigationMenu.
 *
 * @returns {JSX.Element} The rendered mobile navigation menu component.
 */
export function MobileNavigationMenu(): JSX.Element {
    const { menuBarOpen, setMenuBarOpen } = useGlobalState();

    function openMenuBar() {
        setMenuBarOpen(true);
    };
    
    return (
        <div>
            <button className={`${styles.menuButton} ${menuBarOpen ? styles['menuButton--visible'] : styles['menuButton--hidden']}`} 
                aria-label="Menu Button" onClick={openMenuBar} >
                <Image
                    src={appConstants.navBarIconProps.menu.src}
                    alt={appConstants.navBarIconProps.menu.alt}
                    width={appConstants.navBarIconProps.menu.width}
                    height={appConstants.navBarIconProps.menu.height}
                />
            </button>
            {menuBarOpen && <MenuBarElements />}
        </div>

    );
}
