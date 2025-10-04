import { NextRequest, NextResponse } from 'next/server';
import * as appConstants from "@utils/appConstants";
import * as helperFunctions from "@utils/helperFunctions";


/**
 * Middleware zur Sprachverwaltung mit Cookie-Persistenz
 * 
 * Strategie: URL-Priorität mit Cookie-Update
 * - Geteilte Links behalten ihre Sprache (SEO + UX)
 * - Nutzerpräferenz wird persistiert für zukünftige Besuche
 * - Server-Side Rendering erfolgt mit korrekter Sprache (kein FOWC)
 * 
 * Ablauf:
 * 1. Wenn Sprache in URL → Cookie auf URL-Sprache aktualisieren
 * 2. Wenn keine Sprache in URL → auf Cookie-Sprache (oder Default) umleiten
 * 3. Request-Headers für Server-Komponenten erweitern
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Statische Assets und API-Routes überspringen
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/.well-known')
  ) {
    return NextResponse.next();
  }

  // URL-Pfad analysieren
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  const isLanguageInUrl = helperFunctions.isSupportedLanguage(firstSegment);

  // Cookie aus Request auslesen
  const languageCookie = request.cookies.get(appConstants.storageSettings.storageKey);
  const cookieLanguage = languageCookie?.value as appConstants.SupportedLanguageType | undefined;

  /**
   * Fall 1: Sprache ist in URL vorhanden
   * → URL hat Priorität (wichtig für geteilte Links)
   * → Cookie wird auf URL-Sprache synchronisiert
   */
  if (isLanguageInUrl) {
    const urlLanguage = firstSegment as appConstants.SupportedLanguageType;
    const response = NextResponse.next({
      request: {
        headers: createExtendedHeaders(request, pathname, urlLanguage),
      },
    });

    // Cookie aktualisieren, falls nicht vorhanden oder unterschiedlich
    if (!cookieLanguage || cookieLanguage !== urlLanguage) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.cookies.set(appConstants.storageSettings.storageKey, urlLanguage, appConstants.storageSettings as any);
    }

    return response;
  }

  /**
   * Fall 2: Keine Sprache in URL
   * → Auf bevorzugte Sprache (Cookie oder Default) umleiten
   * → Verhindert doppelte Indexierung durch Suchmaschinen
   */
  const targetLanguage = 
    cookieLanguage && helperFunctions.isSupportedLanguage(cookieLanguage)
      ? cookieLanguage
      : appConstants.defaultLanguage;

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLanguage}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(url);
  
  // Cookie setzen, falls noch nicht vorhanden
  if (!cookieLanguage) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.cookies.set(appConstants.storageSettings.storageKey, targetLanguage, appConstants.storageSettings as any);
  }

  return response;
}

/**
 * Helper: Erweiterte Request-Headers für Server-Komponenten
 * 
 * Ermöglicht Server Actions und Server-Komponenten Zugriff auf:
 * - x-pathname: Aktueller Pfad
 * - x-locale: Aktuelle Sprache
 * 
 * @param request - Eingehender Request
 * @param pathname - Aktueller Pfad
 * @param locale - Aktuelle Sprache
 * @returns Erweiterte Headers für NextResponse
 */
function createExtendedHeaders(
  request: NextRequest,
  pathname: string,
  locale: appConstants.SupportedLanguageType
): Headers {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-locale', locale);
  return requestHeaders;
}

// Matcher-Konfiguration: Nur relevante Routen abfangen
export const config = {
  matcher: [
    /*
     * Alle Pfade außer:
     * - /api (API Routes)
     * - /_next (Next.js Internals)
     * - /assets (Statische Assets)
     * - /favicon.ico (Favicon)
     * - /.well-known (Well-known URIs)
     */
    '/((?!api|_next|assets|favicon.ico|\\.well-known).*)',
  ],
};
