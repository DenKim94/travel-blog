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
                <h1>{appConstants.imprintTranslations[lang].title}</h1>
            </header>

            <main className={styles.impressumContainer}>
                <section className={styles.section}>
                    <h2>{appConstants.imprintTranslations[lang].subtitle}</h2>
                    <p>
                        {appConstants.imprintTranslations[lang].adress.name}<br/>
                        {appConstants.imprintTranslations[lang].adress.street}<br/>
                        {appConstants.imprintTranslations[lang].adress.city}<br /> 
                        {appConstants.imprintTranslations[lang].adress.country}
                    </p>               
                </section>

                <section className={styles.section}>
                    <h2>{appConstants.imprintTranslations[lang].contact.title}</h2>
                    <p>{appConstants.imprintTranslations[lang].contact.email}</p>
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