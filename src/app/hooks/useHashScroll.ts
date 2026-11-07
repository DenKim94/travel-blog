'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Zeitfenster, in dem nach dem Laden nachjustiert wird. */
const ALIGN_WINDOW_MS = 1500;

/** Abweichung in Pixeln, ab der neu ausgerichtet wird. */
const ALIGN_EPSILON_PX = 2;

/**
 * Anzahl aufeinanderfolgender Frames, in denen das Ziel korrekt sitzen muss,
 * bevor das Nachjustieren endet. Ohne dieses frühe Ende liefe die Schleife das
 * volle Zeitfenster weiter und könnte Scrollvorgänge zurückdrehen, die
 * zwischenzeitlich von anderer Seite ausgelöst wurden.
 */
const STABLE_FRAMES = 5;

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
        let userTookOver = false;
        let frameId = 0;

        const getTarget = (): HTMLElement | null => {
            const targetId = decodeURIComponent(window.location.hash.slice(1));
            return targetId ? document.getElementById(targetId) : null;
        };

        const alignToHash = (behavior: ScrollBehavior): void => {
            if (cancelled) return;
            getTarget()?.scrollIntoView({ block: 'start', behavior });
        };

        /**
         * Richtet über ein kurzes Zeitfenster wiederholt aus, statt nur einmal.
         *
         * Nötig, weil beim Erstaufruf nicht feststeht, wann das Layout steht:
         * Solange der Scroll-Container noch keine Höhe hat, läuft ein einzelner
         * `scrollIntoView`-Aufruf wirkungslos ins Leere, und die Seite bleibt
         * am Anfang stehen. Sobald das Ziel oben anliegt, passiert nichts mehr.
         */
        const alignUntilSettled = (): void => {
            const deadline = performance.now() + ALIGN_WINDOW_MS;
            let stableFrames = 0;

            const tick = (): void => {
                if (cancelled || userTookOver) return;

                const target = getTarget();
                const scroller = target?.closest('main');

                if (target && scroller) {
                    const offset = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top;

                    if (Math.abs(offset) > ALIGN_EPSILON_PX) {
                        target.scrollIntoView({ block: 'start', behavior: 'instant' });
                        stableFrames = 0;
                    } else {
                        stableFrames += 1;
                    }
                } else {
                    // Ziel noch nicht im DOM – etwa unmittelbar nach einem
                    // Routenwechsel, bevor die neue Seite gerendert ist.
                    // Das ist kein erreichter Zustand, sondern ein Grund
                    // weiterzuversuchen.
                    stableFrames = 0;
                }

                // Sitzt das Ziel stabil, ist die Aufgabe erledigt – danach darf
                // die Schleife nicht weiter in das Scrollverhalten eingreifen.
                if (stableFrames >= STABLE_FRAMES) return;

                if (performance.now() < deadline) {
                    frameId = requestAnimationFrame(tick);
                }
            };

            frameId = requestAnimationFrame(tick);
        };

        if (window.location.hash) {
            alignUntilSettled();
        }

        // Erneut ausrichten, sobald alle Bilder geladen sind: Nachladende
        // Bilder verschieben das Layout sonst unter dem bereits gescrollten
        // Inhalt weg.
        const alignAfterLoad = (): void => alignToHash('instant');
        if (document.readyState !== 'complete') {
            window.addEventListener('load', alignAfterLoad, { once: true });
        }

        // Sobald selbst gescrollt wird, hat die Nutzerin das Sagen – das
        // Nachjustieren wird dann sofort eingestellt.
        const handOver = (): void => { userTookOver = true; };
        const interactionEvents = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
        interactionEvents.forEach(eventName =>
            window.addEventListener(eventName, handOver, { once: true, passive: true })
        );

        // Reine Fragmentwechsel – etwa über die Einstiegs-Links der Startseite –
        // lösen keinen Router-Wechsel aus, müssen aber ebenfalls scrollen.
        const handleHashChange = (): void => {
            userTookOver = false;
            alignToHash('smooth');
        };
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            cancelled = true;
            cancelAnimationFrame(frameId);
            window.removeEventListener('load', alignAfterLoad);
            window.removeEventListener('hashchange', handleHashChange);
            interactionEvents.forEach(eventName => window.removeEventListener(eventName, handOver));
        };
    }, [pathname]);
}
