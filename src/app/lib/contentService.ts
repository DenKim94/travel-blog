import { strapiClient } from './strapi';
import * as appConstants from "@utils/appConstants"
import type { LandingPageData, BlogPostData, StrapiImage, TravelMapData, AboutPageData, PrivacyPolicyData } from '@/types/strapiTypes';

/**
 * Die folgenden Funktionen laden die entsprechenden Daten (für Landingpage, Blog-Posts, About-Page oder Privacy-Policy) 
 * für die angegebene Sprache.
 *
 * Die Funktionen setzen die Sprache (locale) des Strapi-Clients auf die angegebene Sprache
 * und konvertieren jeweils die Antwort in ein entsprechendes Data-Objekt.
 * Wenn ein Fehler auftritt, wird null zurückgegeben und der Fehler wird in der Konsole
 * ausgegeben.
 *
 * @param appLanguage Die gewünschte Sprache (z.B. 'de', 'en', 'ru').
 * @returns Ein Data-Objekt, wenn die Anfrage erfolgreich war, sonst null.
 */

export async function getLandingPageContent(appLanguage: appConstants.SupportedLanguageType): Promise<LandingPageData | null> {
  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getLandingPageData();
      if (response.data.length === 0) {
        console.warn('@getLandingPageContent: No data found.');
        return null;
      }    
    const landingPageMappedData = mapLandingPageData(response);
    return landingPageMappedData;

  } catch (error) {
    console.error('Error on loading Landingpage data: ', error);
    return null;
  }
}

export async function getBlogPosts(appLanguage: appConstants.SupportedLanguageType): Promise<Array<BlogPostData> | null> {
    try {
        strapiClient.setLocale(appLanguage);
        const response = await strapiClient.getBlogPosts();
        if (response.data.length === 0) {
          console.warn('@getBlogPosts: No data found.');
          return null;
        }        
        const blogPostsMappedData = mapBlogPostData(response);
        return blogPostsMappedData;

    } catch (error) {
        console.error('Error on loading blog post data: ', error);
        return null;
    }
}

export async function getAboutPageContent(appLanguage: appConstants.SupportedLanguageType): Promise<AboutPageData | null> {
  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getAboutData();
    if (response.data.length === 0) {
      console.warn('@getAboutPageContent: No data found.');
      return null;
    }

    const aboutPageMappedData = mapAboutPageData(response);
    return aboutPageMappedData;

  } catch (error) {
    console.error('Error on loading about-page data: ', error);
    return null;
  }
}

export async function getTravelMapData(appLanguage: appConstants.SupportedLanguageType): Promise<TravelMapData | null> {
  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getTravelMapData();
    if (response.data.length === 0) {
      console.warn('@getTravelMapData: No data found.');
      return null;
    }
    const travelMapMappedData = mapTravelMapData(response);
    return travelMapMappedData;

  } catch (error) {
    console.error('Error on loading travel-map data: ', error);
    return null;
  }
}

export async function getPrivacyPolicyData(appLanguage: appConstants.SupportedLanguageType): Promise<PrivacyPolicyData | null> {
  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getPrivacyPolicyData();
    if (response.data.length === 0) {
      console.warn('@getPrivacyPolicyContent: No data found.');
      return null;
    }

    const privacyPolicyMappedData = mapPrivacyPolicyData(response);
    return privacyPolicyMappedData;

  } catch (error) {
    console.error('Error on loading privacy-policy data: ', error);
    return null;
  }
}

// ############### Helper Functions ###############
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
    console.error('Error on loading landing-page data: ', error);
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
    console.error('Error on mapping the travel data: ', error);
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
    console.error('Error on mapping the blog-post data: ', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAboutPageData(response: any): AboutPageData | null {
  try {
    if (!response.data || response.data.length === 0) return null;
    const entry = response.data[0];

    return {
      id: entry.id,
      titleImage: mapStrapiImageProps(entry.TitleImage),
      description: entry.AboutDescription,
      profileImage: mapStrapiImageProps(entry.ProfileImage),
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    };

  } catch (error) {
    console.error('Error on mapping the about-page data: ', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapStrapiImageProps(imgProps: any): StrapiImage | null {
  if (!imgProps || !imgProps.url) {
    console.warn('No image properties found: ', imgProps);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPrivacyPolicyData(response: any): PrivacyPolicyData | null {
  try {
    if (!response.data || response.data.length === 0) return null;
    const entry = response.data[0];

    return {
      title: entry.Titel,
      content: entry.Content,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    };

  } catch (error) {
    console.error('Error on mapping the privacy-policy data: ', error);
    return null;
  }
}