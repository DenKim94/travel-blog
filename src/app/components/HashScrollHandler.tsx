'use client';

import { useHashScroll } from "@hooks/useHashScroll";

/**
 * Rendert nichts und hängt lediglich die Fragment-Navigation ein.
 *
 * Liegt als eigene Client-Komponente vor, damit das Layout eine
 * Server-Komponente bleiben kann.
 */
export function HashScrollHandler(): null {
    useHashScroll();
    return null;
}
