'use client';
import styles from '@styles/components/impressum.module.scss';
import * as appConstants from "@utils/appConstants";
import GenericButton from '@components/GenericButton';
import { useBackToHomeCallback } from '@hooks/useBackHomeCallback';
import { useGlobalState } from '@/context/GlobalStateContext';

export default function Imprint() {
    const backToHome = useBackToHomeCallback();
    const { language: lang } = useGlobalState();

    const buttonstyle = {
        width: '250px',
        marginTop: '20px',
        marginBottom: '20px',
    };

    // TODO: Inhalt an Sprache anpassen [11.09.2025]    
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Impressum</h1>
            </header>

            <main className={styles.impressumContainer}>
                <section className={styles.section}>
                    <h2>Angaben gemäß § 5 TMG</h2>
                    <p>Nadja Ogaj <br/>Brambusch 5<br/>28757 Bremen<br /> Deutschland</p>               
                </section>

                <section className={styles.section}>
                    <h2>Kontakt</h2>
                    <p>Nutzen Sie zur Kontaktaufnahme bitte das entsprechende Kontaktformular der Webseite.</p>
                </section>
                <GenericButton
                    title={appConstants.notFoundTranslations[lang].backToHome}
                    onClick={backToHome}
                    style={buttonstyle}
                />
            </main>
        </div>
    );
}