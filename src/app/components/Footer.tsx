'use client';
import Link from 'next/link';
import styles from "@styles/components/footer.module.scss";
import { useIsOnImprintPage } from "@/hooks/usePageTracker";
// import { useGlobalState } from '@context/GlobalStateContext';

export default function Footer() {
    // const { language } = useGlobalState(); 
    const isOnImprintPage = useIsOnImprintPage();
    if (isOnImprintPage) {
        return null;
    }
    
    // TODO: Inhalt an Sprache anpassen [11.09.2025]
    return (
        <div className={styles.footerContainer}>
            <Link href="/impressum" className={styles.footerLink}>
              Impressum 
            </Link>
        </div>
    )
}