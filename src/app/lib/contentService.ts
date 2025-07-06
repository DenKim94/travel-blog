import { strapiClient } from './strapi';
import type {  LandingPageData, BlogPost, StrapiImage } from '@/types/strapiTypes';

/**
 * Lädt die Landingpage-Daten für die angegebene Sprache.
 *
 * Die Funktion setzt die Locale des Strapi-Clients auf die angegebene Sprache,
 * fragt die Landingpage-Daten ab und konvertiert die Antwort in ein LandingPageData-Objekt.
 * Wenn ein Fehler auftritt, wird null zurückgegeben und der Fehler wird in der Konsole
 * ausgegeben.
 *
 * @param appLanguage Die gewünschte Sprache (z.B. 'de', 'en', 'ru').
 * @returns Ein LandingPageData-Objekt, wenn die Anfrage erfolgreich war, sonst null.
 */
export async function getLandingPageContent(appLanguage: string): Promise<LandingPageData | null> {
  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getLandingPageData();
      if (response.data.length === 0) {
        console.warn('@getLandingPageContent: Keine Daten gefunden.');
        return null;
      }    
    const landingPageMappedData = mapLandingPageData(response);
    return landingPageMappedData;

  } catch (error) {
    console.error('Fehler beim Laden der Landingpage-Daten: ', error);
    return null;
  }
}

export async function getBlogPosts(appLanguage: string): Promise<BlogPost | null> {
    try {
        strapiClient.setLocale(appLanguage);
        const response = await strapiClient.getBlogPosts();
        if (response.data.length === 0) {
          console.warn('@getBlogPosts: Keine Daten gefunden.');
          return null;
        }        
        const blogPostsMappedData = mapBlogPostData(response);
        return blogPostsMappedData;

    } catch (error) {
        console.error('Fehler beim Laden der Blog-Posts: ', error);
        return null;
    }
}

export async function getAboutPageContent(appLanguage: string): Promise<undefined | null> {
  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getAboutData();
    if (response.data.length === 0) {
      console.warn('@getAboutPageContent: Keine Daten gefunden.');
      return null;
    }
    return response.data;

  } catch (error) {
    console.error('Fehler beim Laden der About-Seite-Daten: ', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapLandingPageData(response: any): LandingPageData | null {
  try {
    if (!response.data || response.data.length === 0) return null;
    const entry = response.data[0];
    
    return {
      id: entry.id,
      title: entry.TitleText,
      titleImages: entry.TitleImage?.map(mapStrapiImageProps) || [],
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    };

  } catch (error) {
    console.error('Fehler beim Mappen der Landingpage-Daten: ', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBlogPostData(response: any): BlogPost | null {
  try {
    if (!response.data || response.data.length === 0) return null;
    const entry = response.data[0];

    return {
      id: entry.id,
      title: entry.Titel,               // Ggf. Eigenschaften je nach Content Typ anpassen
      description: entry.Beschreibung,  // Ggf. Eigenschaften je nach Content Typ anpassen
      country: entry.Land,
      featuredImages: entry.Medien?.map(mapStrapiImageProps) || [], // Ggf. Eigenschaften je nach Content Typ anpassen
      publishedAt: entry.publishedAt,
      locale: entry.locale
    };

  } catch (error) {
    console.error('Fehler beim Mappen der Blogpost-Daten: ', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapStrapiImageProps(imgProps: any): StrapiImage | null {
  if (!imgProps || !imgProps.url) {
    console.warn('Ungültige Bilddaten: ', imgProps);
    return null;
  }
  return {
    id: imgProps.id,
    url: `${process.env.STRAPI_PUBLIC_URL}${imgProps.url}`,
    alternativeText: imgProps.alternativeText,
    width: imgProps.width,
    height: imgProps.height,
    formats: imgProps.formats,
    extension: imgProps.ext,
    hash: imgProps.hash || null,
  };
}