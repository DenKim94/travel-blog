import * as apiConstants from "@utils/apiConstants"
import * as appConstants from "@utils/appConstants"
import type {  BlogPostData } from '@/types/strapiTypes';

/**
 * StrapiClient ist eine Klasse zur Interaktion mit der Strapi-API.
 * 
 * Diese Klasse kapselt Methoden zur Authentifizierung, Lokalisierung und zum Abrufen von Daten
 * wie Landing-Page, Blog-Posts und About-Page aus einer Strapi-Instanz. Sie unterstützt die
 * automatische Übergabe von Authentifizierungs-Token und Locale-Informationen sowie das Setzen
 * von Revalidierungszeiten für das Caching.
 * 
 * @example
 * const client = new StrapiClient();
 * client.setLocale('de');
 * const landingPage = await client.getLandingPageData();
 * 
 * @property {string} appLocale - Die aktuelle Sprache/Locale der Anwendung.
 * @property {string} baseURL - Die Basis-URL der Strapi-API.
 * @property {string | undefined} token - Das optionale Authentifizierungs-Token für die API.
 * 
 * @method setLocale (locale: string): void
 * Setzt die aktuelle Sprache/Locale für API-Anfragen.
 * 
 * @method getLocale(): string
 * Gibt die aktuell gesetzte Sprache/Locale zurück.
 * 
 * @method getLandingPageData(): Promise<any>
 * Ruft die Landing-Page-Daten für die aktuelle Sprache/Locale ab.
 * 
 * @method getBlogPosts (limit?: number): Promise<any>
 * Ruft Blog-Posts für die aktuelle Sprache/Locale ab, optional mit Limitierung der Anzahl.
 * 
 * @method getAboutData(): Promise<any>
 * Ruft die About-Page-Daten für die aktuelle Sprache/Locale ab.
 */
export class StrapiClient {
    appLocale: string = appConstants.defaultLanguage; // Default locale
    private baseURL: string;
    private token?: string;
    private maxPageSize: number
    private blogPostsData: Array<BlogPostData> | null = [] ;

    constructor() {
        this.baseURL = process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337';
        this.token = process.env.STRAPI_API_TOKEN;
        this.maxPageSize = parseInt(process.env.MAX_PAGE_SIZE_DEFAULT || '25', 10);
    }

    setLocale(locale: appConstants.SupportedLanguageType) {
        this.appLocale = appConstants.strapiLocaleMapping[locale]; 
    }
    
    getLocale() {
        return this.appLocale;
    }

    setBlogPostData(data: Array<BlogPostData> | null) {
        this.blogPostsData = data;
    }

    getBlogPostData() : Array<BlogPostData> | null {
        return this.blogPostsData;
    }

    getBlogPostCountries(): Array<string> {
        return this.blogPostsData?.map((blogPost: BlogPostData) => blogPost.country) || [];
    }

    getBlogPostIds(): Array<number> {
        return this.blogPostsData?.map((blogPost: BlogPostData) => blogPost.id) || [];
    }

    /**
     * Private method to fetch data from Strapi API.
     * @param endpoint The API endpoint to query.
     * @param revalidationTime_s The time in seconds to revalidate the response.
     * Defaults to {@link apiConstants.REVALIDATION_TIME_GENERIC}.
     * @returns The JSON response from the API.
     * @throws {Error} If the response status is not 200.
     * @private
     */
    private async fetchAPI(endpoint: string, revalidationTime_s: number = apiConstants.REVALIDATION_TIME_GENERIC) {
        try {
            const url = `${this.baseURL}/api${endpoint}`;

            const headers: HeadersInit = {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            };

            if (!this.token) {
                throw new Error("Token is missing. Please provide a valid Strapi API token.");
            }

            const response = await fetch(url, { 
                headers,
                cache: 'force-cache',               
                next: {
                    revalidate: revalidationTime_s, 
                } 
            });
            
            if (!response.ok) {
                throw new Error(`Failed request - ${response.status}`);
            }

            return response.json();

        }catch(error){
            console.error(`Error fetching from Strapi API: ${error}`);
            throw error;
        }
    }

    /**
     * Fetches landing page data from the Strapi API for the current locale.
     * The response includes all related data populated by default.
     * @returns A promise resolving to the JSON response containing the landing page data.
     * @throws {Error} If the API request fails or the response status is not 200.
     */

    async getLandingPageData() {
        const endpoint = `/landing-pages?locale=${this.appLocale}&populate=*`;
        return this.fetchAPI(endpoint, apiConstants.REVALIDATION_TIME_LANDING_PAGE);
    }

    /**
     * Fetches blog posts from the Strapi API for the current locale.
     * The response includes all related data populated by default.
     * @param {number} limit The number of blog posts to fetch.
     * Defaults to MAX_PAGE_SIZE_DEFAULT.
     * @returns A promise resolving to the JSON response containing the blog posts.
     * @throws {Error} If the API request fails or the response status is not 200.
     */
    async getBlogPosts(limit: number = this.maxPageSize) {
        const endpoint = `/blog-posts?locale=${this.appLocale}&populate=*&pagination[limit]=${limit}`;
        return this.fetchAPI(endpoint, apiConstants.REVALIDATION_TIME_BLOG_POSTS);
    }

    /**
     * Fetches the about page data from the Strapi API for the current locale.
     * The response includes all related data populated by default.
     * @returns A promise resolving to the JSON response containing the about page data.
     * @throws {Error} If the API request fails or the response status is not 200.
     */

    async getAboutData() {
        const endpoint = `/about-pages?locale=${this.appLocale}&populate=*`;
        return this.fetchAPI(endpoint, apiConstants.REVALIDATION_TIME_ABOUT_PAGE);
    }

    /**
     * Fetches travel map data from the Strapi API for the current locale.
     * The response includes all related data populated by default.
     * @returns A promise resolving to the JSON response containing the travel map data.
     * @throws {Error} If the API request fails or the response status is not 200.
     */

    async getTravelMapData() {
        const endpoint = `/travel-maps?locale=${this.appLocale}&populate=*`;
        return this.fetchAPI(endpoint, apiConstants.REVALIDATION_TIME_BLOG_POSTS);
    }
}

export const strapiClient = new StrapiClient();
