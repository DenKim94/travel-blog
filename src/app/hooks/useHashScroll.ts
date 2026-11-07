'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scrollt beim Aufruf einer URL mit Fragment (z. B. `/de#about`) zum passenden
 * Abschnitt und reagiert auf reine Fragmentwechsel.
 *
 * Hintergrund: Die Anwendung scrollt nicht im Dokument, sondern in einem
 * inneren Container (`<main>` mit `overflow-y: auto`). Das Dokument selbst ist
 * nicht scrollbar, deshalb läuft die native Ankernavigation des Browsers ins
 * Leere. Bis Next.js 15.3 hat der Router den nächsten scrollbaren Vorfahren
 * selbst ausgerichtet; seit 15.5 nicht mehr. Ohne diesen Hook landen geteilte
 * Links und Lesezeichen auf einen Abschnitt am Seitenanfang.
 *
 * `scrollIntoView` richtet den nächsten scrollbaren Vorfahren aus und trifft
 * damit genau den `<main>`-Container.
 */
export function useHashScroll(): void {
    const pathname = usePathname();

    useEffect(() => {
        let cancelled = false;

        const alignToHash = (behavior: ScrollBehavior): void => {
            if (cancelled) return;

            const targetId = decodeURIComponent(window.location.hash.slice(1));
            if (!targetId) return;

            document.getElementById(targetId)?.scrollIntoView({ block: 'start', behavior });
        };

        // Beim Erstaufruf ohne Animation ausrichten – ein sichtbarer Flug vom
        // Seitenanfang zum Abschnitt wäre hier nur Unruhe.
        const initialFrame = requestAnimationFrame(() => alignToHash('instant'));

        // Erneut ausrichten, sobald alle Bilder geladen sind: Nachladende
        // Bilder verschieben das Layout sonst unter dem bereits gescrollten
        // Inhalt weg.
        const alignAfterLoad = (): void => alignToHash('instant');
        if (document.readyState !== 'complete') {
            window.addEventListener('load', alignAfterLoad, { once: true });
        }

        // Reine Fragmentwechsel – etwa über die Einstiegs-Links der Startseite –
        // lösen keinen Router-Wechsel aus, müssen aber ebenfalls scrollen.
        const handleHashChange = (): void => alignToHash('smooth');
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            cancelled = true;
            cancelAnimationFrame(initialFrame);
            window.removeEventListener('load', alignAfterLoad);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [pathname]);
}
