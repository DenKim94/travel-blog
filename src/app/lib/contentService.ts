import { strapiClient } from './strapi';
import * as appConstants from "@utils/appConstants"
import type {  LandingPageData, BlogPostData, StrapiImage, TravelMapData } from '@/types/strapiTypes';

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
export async function getLandingPageContent(appLanguage: appConstants.SupportedLanguageType): Promise<LandingPageData | null> {
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

export async function getBlogPosts(appLanguage: appConstants.SupportedLanguageType): Promise<Array<BlogPostData> | null> {
    try {
        strapiClient.setLocale(appLanguage);
        const response = await strapiClient.getBlogPosts();
        if (response.data.length === 0) {
          console.warn('@getBlogPosts: Keine Daten gefunden.');
          return null;
        }        
        const blogPostsMappedData = mapBlogPostData(response);
        strapiClient.setBlogPostData(blogPostsMappedData);
        
        return blogPostsMappedData;

    } catch (error) {
        console.error('Fehler beim Laden der Blog-Posts: ', error);
        return null;
    }
}

export async function getAboutPageContent(appLanguage: appConstants.SupportedLanguageType): Promise<undefined | null> {
  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getAboutData();
    if (response.data.length === 0) {
      console.warn('@getAboutPageContent: Keine Daten gefunden.');
      return null;
    }

    return response.data; // TBD

  } catch (error) {
    console.error('Fehler beim Laden der About-Daten: ', error);
    return null;
  }
}

export async function getTravelMapData(appLanguage: appConstants.SupportedLanguageType): Promise<TravelMapData | null> {
  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getTravelMapData();
    if (response.data.length === 0) {
      console.warn('@getTravelMapData: Keine Daten gefunden.');
      return null;
    }
    const travelMapMappedData = mapTravelMapData(response);
    return travelMapMappedData;

  } catch (error) {
    console.error('Fehler beim Laden der Travel-Map-Daten: ', error);
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
      titleImages: entry.TitleImage ? mapStrapiImageProps(entry.TitleImage) : null,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    };

  } catch (error) {
    console.error('Fehler beim Mappen der Landingpage-Daten: ', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTravelMapData(response: any): TravelMapData | null {
  try {
    if (!response.data || response.data.length === 0) return null;
    const entry = response.data[0];
    
    return {
      name: entry.TravelMap ? entry.TravelMap.name : '',
      imageProps: entry.TravelMap ? mapStrapiImageProps(entry.TravelMap) : null,
      updatedAt: entry.updatedAt,
    };

  }catch (error) {
    console.error('Fehler beim Mappen der Blogpost-Daten: ', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBlogPostData(response: any): Array<BlogPostData> | null {
  try {
    if (!response.data || response.data.length === 0) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((entry: any) => ({
      id: entry.id,
      title: entry.Titel,               // Ggf. Eigenschaften je nach Content Typ anpassen
      description: entry.Beschreibung,  // Ggf. Eigenschaften je nach Content Typ anpassen
      country: entry.Land,
      featuredImages: entry.Medien?.map(mapStrapiImageProps) || [], // Ggf. Eigenschaften je nach Content Typ anpassen
      publishedAt: entry.publishedAt,
      locale: entry.locale
    }));

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