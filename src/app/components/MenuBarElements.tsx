"use client";
import { NavigationBarItemType } from "@/types/NavigationBarTypes";
import { JSX, useMemo } from "react";
import Image from 'next/image';
import { useGlobalState } from '@context/GlobalStateContext';
import * as appConstants from "@utils/appConstants"
import * as helperFunctions from "@utils/helperFunctions"
import { SearchButton } from "./SearchModule";
import { GlobalLanguageSetter } from "./LanguageSetter";
import variables from "@styles/variables.module.scss";
import styles from "@styles/components/mobile-menu.module.scss";

/**
 * MenuBarElements Component
 * Renders the navigation menu elements including navigation items, 
 * search functionality, and a language selector. The navigation items
 * are dynamically generated based on the current language setting.
 *
 * @returns {JSX.Element} The rendered menu bar elements component.
 */

export function MenuBarElements(): JSX.Element {
    const { language, setMenuBarOpen } = useGlobalState();
    const headerHeight = parseInt(variables.headerHeight, 10);

    const navBarItems: NavigationBarItemType[] = useMemo(() => {
        return helperFunctions.getNavigationItems(language);
    }, [language]);

    function closeMenuBar() {
        setMenuBarOpen(false);
    };

    return(
        <div className={styles.mobileMenu} aria-label="Mobile Menu">  

            {/* Navigation Items */}
            <ul className={styles.mobileMenuList} role="menubar" aria-label="Mobile Menu Elements">

                {navBarItems?.map((item) => (
                    <li key={item.title} className={styles.mobileMenuItem}>
                        <a href={`#${item.id}`}
                            className={styles.mobileMenuLinkItem}
                            role="menuitem"
                            tabIndex={0}
                            aria-label={item.title}
                            onClick={(e) => helperFunctions.handleSmoothScroll(item.id, headerHeight, e)}>
                            {item.title.toUpperCase()}
                        </a>
                    </li>
                ))}
            </ul>  
            
            <SearchButton />
            <GlobalLanguageSetter /> 
                 
            <button className={styles.closeMenuButton} aria-label="Close Menu Button" onClick={closeMenuBar} >
                <Image
                    src={appConstants.navBarIconProps.close.src}
                    alt={appConstants.navBarIconProps.close.alt}
                    width={appConstants.navBarIconProps.close.width}
                    height={appConstants.navBarIconProps.close.height}
                />
            </button>
        </div>
    )
}
