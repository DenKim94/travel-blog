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

    setLocale(locale: appConstants.SupportedLanguageType) {
        this.appLocale = appConstants.strapiLocaleMapping[locale]; 
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

            return await response.json();

        }catch(error){
            console.error(`Error fetching from Strapi API: ${error}`);
            throw error;
        }
    }

    /**
     * Fetches landing page data from the Strapi API for the current locale.
     * The response includes all related data populated by default.
     * @param query The query string to filter, sort, and paginate results.
     * @returns A promise resolving to the JSON response containing the landing page data.
     * @throws {Error} If the API request fails or the response status is not 200.
     */

    async getLandingPageData(query: string) {
        try {
            const endpoint = `/landing-pages?${query}`;
            return await this.fetchAPI(endpoint, apiConstants.REVALIDATION_TIME_LANDING_PAGE);

        } catch (error) {
            console.error("Landing Page could not be loaded:", error);
            return null;
        }
    }

    /**
     * Fetches blog post data from the Strapi API for the current locale.
     * The response includes all related data populated by default.
     * @param query The query string to filter, sort, and paginate results.
     * @returns A promise resolving to the JSON response containing the blog posts.
     * @throws {Error} If the API request fails or the response status is not 200.
     */
    async getBlogPostData(query: string) {
        try {
            const endpoint = `/blog-posts?${query}`;
            return await this.fetchAPI(endpoint, apiConstants.REVALIDATION_TIME_BLOG_POSTS);

        } catch (error) {
            console.error("Blog Posts could not be loaded:", error);
            return null;
        }
    }
    /**
     * Fetches the about page data from the Strapi API for the current locale.
     * The response includes all related data populated by default.
     * @param query The query string to filter, sort, and paginate results.
     * @returns A promise resolving to the JSON response containing the about page data.
     * @throws {Error} If the API request fails or the response status is not 200.
     */

    async getAboutData(query: string) {
        try {
            const endpoint = `/about-pages?${query}`;
            return await this.fetchAPI(endpoint, apiConstants.REVALIDATION_TIME_ABOUT_PAGE);
        } catch (error) {
            console.error("About Page could not be loaded:", error);
            return null;
        }
    }

    /**
     * Fetches travel map data from the Strapi API for the current locale.
     * The response includes all related data populated by default.
     * @param query The query string to filter, sort, and paginate results.
     * @returns A promise resolving to the JSON response containing the travel map data.
     * @throws {Error} If the API request fails or the response status is not 200.
     */

    async getTravelMapData(query: string) {
        try {
            const endpoint = `/travel-maps?${query}`;
              console.log(endpoint);
            return await this.fetchAPI(endpoint, apiConstants.REVALIDATION_TIME_BLOG_POSTS);
        } catch (error) {
            console.error('TravelMap could not be loaded:', error);
            return null;
        }
    }

    /**
     * Fetches the privacy policy data from the Strapi API for the current locale.
     * The response includes all related data populated by default.
     * @returns A promise resolving to the JSON response containing the privacy policy data.
     * @throws {Error} If the API request fails or the response status is not 200.
     */
    async getPrivacyPolicyData() {
        try {
            const endpoint = `/privacy-policies?locale=${this.appLocale}`;
            return await this.fetchAPI(endpoint, apiConstants.REVALIDATION_TIME_GENERIC);

        } catch (error) {
            console.error("Privacy Policy could not be loaded:", error);
            return null;
        }
    }
}

export const strapiClient = new StrapiClient();
