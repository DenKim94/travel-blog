'use client';
import Link from 'next/link';
import Image from 'next/image';
import * as appConstants from "@utils/appConstants";
import styles from "@styles/components/footer.module.scss";
import { useIsOnImprintPage } from "@/hooks/usePageTracker";
import { useGlobalState } from '@context/GlobalStateContext';

export default function Footer() {
    const { language } = useGlobalState(); 
    const isOnImprintPage = useIsOnImprintPage();
    if (isOnImprintPage) {
        return null;
    }
    
    return (
        <div className={styles.footerContainer} data-testid="footer-container">
            <Link href={`/${language}/imprint`} className={styles.footerLink} data-testid="imprint-link">
              {appConstants.imprintTranslations[language]?.title} 
            </Link>
            {/* Social-Media Icons */}
            <div className={styles.iconContainer} data-testid="icon-container">
                {appConstants.footerIconProps.map((iconObj, index) => (
                    <a key={index} href={iconObj.url} target="_blank" rel="noopener noreferrer">
                        <Image 
                            src={iconObj.src} 
                            alt={iconObj.alt} 
                            width={iconObj.width} 
                            height={iconObj.height} 
                            className={iconObj.className}
                        />
                    </a>
                ))}
            </div>
        </div>
    )
}