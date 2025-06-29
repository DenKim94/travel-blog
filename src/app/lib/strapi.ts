import * as apiConstants from "@utils/apiConstants"
import * as appConstants from "@utils/appConstants"


// TODO: Implement error handling and JSDoc comments [29.06.2025]
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

    private async fetchAPI(endpoint: string, revalidationTime_s: number = apiConstants.REVALIDATION_TIME_GENERIC) {

        const url = `${this.baseURL}/api${endpoint}`;
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
        }

        const response = await fetch(url, { 
            headers,
            cache: 'force-cache',               
            next: {
                revalidate: revalidationTime_s, 
            } 
        });
        
        if (!response.ok) {
            throw new Error(` >> Strapi API Error: ${response.status}`);
        }

        return response.json();
    }

    async getLandingPageData() {
        const endpoint = `/landing-page?locale=${this.appLocale}&populate=*`;
        const revalidationTime_s = apiConstants.REVALIDATION_TIME_LANDING_PAGE;

        return this.fetchAPI(endpoint, revalidationTime_s);
    }

    async getBlogPosts(limit: number = 12) {
        const endpoint = `/blog-posts?locale=${this.appLocale}&populate=*&pagination[limit]=${limit}`;
        const revalidationTime_s = apiConstants.REVALIDATION_TIME_BLOG_POSTS;
        return this.fetchAPI(endpoint, revalidationTime_s);
    }

    async getAboutData() {
        const endpoint = `/about-page?locale=${this.appLocale}&populate=*`;
        const revalidationTime_s = apiConstants.REVALIDATION_TIME_ABOUT_PAGE;
        return this.fetchAPI(endpoint, revalidationTime_s);
    }
}

export const strapiClient = new StrapiClient();
