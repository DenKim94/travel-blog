import { strapiClient } from './strapi';
import type { StrapiResponse, LandingPageData, BlogPost } from '@/types/strapiTypes';

export async function getLandingPageContent(appLanguage: string): Promise<LandingPageData | null> {
  try {
    strapiClient.setLocale(appLanguage);
    const response: StrapiResponse<LandingPageData> = await strapiClient.getLandingPageData();
    return response.data;

  } catch (error) {
    console.error('Fehler beim Laden der Landingpage-Daten:', error);
    return null;
  }
}

export async function getBlogPosts(appLanguage: string): Promise<BlogPost[] | null> {
    try {
        strapiClient.setLocale(appLanguage);
        const response: StrapiResponse<BlogPost[]> = await strapiClient.getBlogPosts();
        return response.data;
    
    } catch (error) {
        console.error('Fehler beim Laden der Blog-Posts: ', error);
        return null;
    }
}

export async function getAboutPageContent(appLanguage: string) {
  try {
    strapiClient.setLocale(appLanguage);
    const response = await strapiClient.getAboutData();
    return response.data;

  } catch (error) {
    console.error('Fehler beim Laden der About-Seite-Daten:', error);
    return null;
  }
}