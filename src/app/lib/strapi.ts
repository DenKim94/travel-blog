import * as apiConstants from "@utils/apiConstants"
import * as appConstants from "@utils/appConstants"


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

    constructor() {
        this.baseURL = process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337';
        this.token = process.env.STRAPI_API_TOKEN;
    }

    setLocale(locale: string) {
        this.appLocale = locale;
    }
    
    getLocale() {
        return this.appLocale;
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
            console.log(`>> Fetching from Strapi API: ${url}`);

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
     * Defaults to {@link apiConstants.MAX_PAGE_SIZE_DEFAULT}.
     * @returns A promise resolving to the JSON response containing the blog posts.
     * @throws {Error} If the API request fails or the response status is not 200.
     */
    async getBlogPosts(limit: number = apiConstants.MAX_PAGE_SIZE_DEFAULT) {
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
}

export const strapiClient = new StrapiClient();
