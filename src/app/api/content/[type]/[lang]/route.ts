import { NextRequest, NextResponse } from 'next/server';
import { getLandingPageContent, getBlogPosts } from "@/lib/contentService";
import * as appConstants from "@utils/appConstants"
import type {  LandingPageData, BlogPostData } from '@/types/strapiTypes';

async function fetchStrapiData(type: string, lang: appConstants.SupportedLanguageType): Promise<Array<BlogPostData> |LandingPageData | null> {
  switch (type) {
    case 'blog-posts':
      return await getBlogPosts(lang);

    case 'landing-page':
      return await getLandingPageContent(lang);

    default:
      throw new Error('Unknown content type');
  }
}

/**
 * Funktion für clientseitige Datenabfragen vom Strapi-Server.
 * Die gewünschten Daten werden beim Server abgefragt und als JSON-Response
 * zurückgegeben.
 * 
 * * Beispielaufruf: const res = await fetch('/api/content/blog-posts/en')
 *
 * @param request - Die Next.js-Anfrage.
 * @param params - Ein Objekt mit den Parametern der Anfrage.
 * @param params.type - Der Typ der abzurufenden Daten (z.B. 'blog-posts', 'landing-page').
 * @param params.lang - Die Sprache der abzurufenden Daten.
 *
 * @returns - Die JSON-Response mit den abgerufenen Daten.
 * Wenn die Daten nicht gefunden werden konnten, wird ein 404-Status mit einem
 * JSON-Objekt mit einer Fehlermeldung zurückgegeben. Wenn ein Fehler auftritt,
 * wird ein 400-Status mit einem JSON-Objekt mit einer Fehlermeldung zurückgegeben.
 *
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { type: string; lang: appConstants.SupportedLanguageType } }
) {
  const { type, lang } = params;

  try {
    const data = await fetchStrapiData(type, lang);

    if (data == null || (Array.isArray(data) && data.length === 0)) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ type, payload: data });

  } catch (error) {
      console.error(`Error fetching from Route-API: ${error}`);
      return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}