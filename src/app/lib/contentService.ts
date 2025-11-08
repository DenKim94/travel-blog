import { strapiClient } from './strapi';
import * as appConstants from "@utils/appConstants"
import * as testParameters from '@e2e/utils/testParameters';
import qs from 'qs';
import type { LandingPageData, BlogPostDetailedData, BlogPostListData, StrapiImage, TravelMapData, AboutPageData, PrivacyPolicyData } from '@/types/strapiTypes';

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

  const query = qs.stringify({
    locale: appConstants.languageOptions[appLanguage].strapiLanguageName,
    fields: ['TitleText', 'locale', 'publishedAt'],
    populate: {
      TitleImage: {
        fields: ['url', 'alternativeText', 'width', 'height'],
      }
    },
  }, { encodeValuesOnly: true });

  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getLandingPageData(query);
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

export async function getDetailedBlogPost(appLanguage: appConstants.SupportedLanguageType, blog_title: string): Promise<BlogPostDetailedData | null> {
    try {
        strapiClient.setLocale(appLanguage);
        const detailedQuery = buildBlogDetailQuery(appLanguage, blog_title);
        const response = await strapiClient.getBlogPostData(detailedQuery)

        if (!response || response.data.length === 0) {
          console.warn('@getDetailedBlogPosts: No data found.');
          return null;
        }        
        const blogPostsMappedData = mapDetailedBlogPostData(response, blog_title);
        return blogPostsMappedData;

    } catch (error) {
        console.error('Error @getDetailedBlogPosts: ', error);
        return null;
    }
}

export async function getBlogPosts(appLanguage: appConstants.SupportedLanguageType): Promise<Array<BlogPostListData> | null> {
    try {
        strapiClient.setLocale(appLanguage);
        const query = buildBlogListQuery(appLanguage);
        const response = await strapiClient.getBlogPostData(query);
      
        if (!response || response.data.length === 0) {
          console.warn('@getBlogPosts(): No data found.');
          return null;
        }        
        const blogPostsMappedData = mapBlogPostData(response);
        return blogPostsMappedData;

    } catch (error) {
        console.error('Error @getBlogPosts(): ', error);
        return null;
    }
}

export async function getAboutPageContent(appLanguage: appConstants.SupportedLanguageType): Promise<AboutPageData | null> {

  const query = qs.stringify({
    locale: appConstants.languageOptions[appLanguage].strapiLanguageName,
    fields: ['AboutDescription', 'locale', 'publishedAt', 'documentId'],
    populate: {
      TitleImage: {
        fields: ['url', 'alternativeText', 'width', 'height'],
      },
      ProfileImage: {
        fields: ['url', 'alternativeText', 'width', 'height'],
      }
    },
  }, { encodeValuesOnly: true });

  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getAboutData(query);
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

  const query = qs.stringify({
    locale: appConstants.languageOptions[appLanguage].strapiLanguageName,
    fields: ['Description', 'locale', 'updatedAt', 'documentId'],
    populate: {
      TravelMap: {
        fields: ['name', 'url', 'alternativeText', 'width', 'height'],
      }
    },
  }, { encodeValuesOnly: true });

  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getTravelMapData(query);
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
function mapBlogPostData(response: any): Array<BlogPostListData> | null {
  try {
    if (!response.data || response.data.length === 0) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((entry: any) => ({
        id: entry.id,
        title: entry.Titel,               
        country: entry.Land,
        featuredImage: entry.Medien?.map(mapStrapiImageProps).at(0), // first image is the title image
        publishedAt: entry.publishedAt,
        locale: entry.locale
    }));

  } catch (error) {
    console.error('Error on mapping the blog-post data: ', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDetailedBlogPostData(response: any, blog_title: string = ''): BlogPostDetailedData | null {
  try {
    if (!response.data || response.data.length === 0) return null;

    const entry = (process.env.PLAYWRIGHT_TEST_MODE === 'true') 
                  ? (testParameters.blogPostsMockData.data.find(post => post.Titel === blog_title) ?? null) 
                  : response.data[0];

    return {
        id: entry.id,
        title: entry.Titel,
        description: entry.Beschreibung,
        country: entry.Land,
        featuredImages: entry.Medien?.map(mapStrapiImageProps) || [],
        publishedAt: entry.publishedAt,
        locale: entry.locale
    };

  } catch (error) {
    console.error('Error @mapDetailedBlogPostData(): ', error);
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

// Query-Builder für Blog-Liste (Übersicht)
function buildBlogListQuery(language: appConstants.SupportedLanguageType) {
  return qs.stringify({
    locale: appConstants.languageOptions[language].strapiLanguageName,
    fields: ['Titel', 'Land', 'locale', 'publishedAt'],
    populate: {
      Medien: {
        fields: ['url', 'alternativeText', 'width', 'height'],
        sort: ['createdAt:asc'], // Erstes hochgeladenes Bild
      }
    },
    pagination: {
      limit: parseInt(process.env.MAX_PAGE_SIZE_DEFAULT || '25', 10)
    },
    sort: ['publishedAt:desc']
  }, { encodeValuesOnly: true });
}

// Query-Builder für Blog-Detail (Einzelansicht)
function buildBlogDetailQuery(
  language: appConstants.SupportedLanguageType, 
  blog_title: string
) {
  return qs.stringify({
    locale: appConstants.languageOptions[language].strapiLanguageName,
    filters: {
      Titel: {
        $containsi: blog_title // Suche nach Titel
      }
    },
    fields: ['Titel', 'Beschreibung', 'Land', 'locale','publishedAt', 'documentId'],
    populate: {
      Medien: {
        fields: ['url', 'alternativeText', 'width', 'height'],
        sort: ['createdAt:asc'], // Erstes hochgeladenes Bild
      }
    }
  }, { encodeValuesOnly: true });
}
