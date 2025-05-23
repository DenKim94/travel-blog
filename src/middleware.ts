import { NextRequest, NextResponse } from 'next/server';
import * as appConstants from "@utils/appConstants"
import * as helperFunctions from "@utils/helperFunctions"


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Folgende Pfade werden von der middleware ignoriert:
  if ( pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/assets') || 
      pathname.startsWith('/favicon.ico') || 
      pathname.startsWith('/.well-known')
    ) {
        return NextResponse.next();
    }

  // Prüfe, ob das erste Segment eine unterstützte Sprache ist
  const pathSegments = pathname.split('/');
  const firstSegment = pathSegments[1];

  if (!helperFunctions.isSupportedLanguage(firstSegment)) {
    // Keine Sprache im Pfad: Weiterleitung auf Standardsprache
    const url = request.nextUrl.clone();
    url.pathname = `/${appConstants.defaultLanguage}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  // Sprache ist im Pfad, alles OK
  return NextResponse.next();
}

// Matcher: Nur relevante Pfade abfangen
export const config = {
  matcher: [
    /*
      Alle Pfade außer:
      - /api
      - /_next
      - /assets
      - /favicon.ico
      - /.well-known
    */
    '/((?!api|_next|assets|favicon.ico|.well-known).*)',
  ],
};
