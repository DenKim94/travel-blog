'use client';

import { JSX } from "react";
import { useRouter, useParams } from 'next/navigation';
import GenericButton from '@components/GenericButton';
import * as appConstants from "@utils/appConstants";

/**
 * Führt von der Datenschutzseite zurück zum Kontaktabschnitt der Startseite.
 *
 * Die Datenschutzseite wird aus dem Kontaktformular heraus geöffnet; ohne
 * diesen Rücksprung bliebe nur der Browser-Zurück-Button.
 *
 * Das Fragment `#contact` wird von `useHashScroll` ausgewertet, das nach dem
 * Routenwechsel den Abschnitt im Scroll-Container ausrichtet.
 */
export function BackToContactButton(): JSX.Element {
    const router = useRouter();
    const params = useParams();
    const lang = (params?.lang as string) || appConstants.defaultLanguage;

    const label = appConstants.backLabel[lang]
        ?? appConstants.backLabel[appConstants.defaultLanguage];

    return (
        <GenericButton
            title={label}
            onClick={() => router.push(`/${lang}#${appConstants.navigationIds.contact}`)}
        />
    );
}
