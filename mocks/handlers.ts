import { http, HttpResponse } from 'msw';
import { landingPageMockData, travelMapMockData, 
         blogPostsMockData, aboutPageMockData, 
         privacyPolicyMockData } from '../e2e/utils/testParameters';

const strapiApiUrl = process.env.STRAPI_PUBLIC_URL;

export const handlers = [
    // Strapi Landing Page mocken
    http.get(`${strapiApiUrl}api/landing-pages`, ({ request }) => {
        const url = new URL(request.url);
        const locale = url.searchParams.get('locale');
        
        console.log('🟡 MSW: Abgefangener Request für locale:', locale);
        
        return HttpResponse.json(landingPageMockData);
    }),

    // Weitere Endpoints mocken
    http.get(`${strapiApiUrl}/api/blog-posts`, () => {
        return HttpResponse.json(blogPostsMockData);
    }),

    http.get(`${strapiApiUrl}/api/travel-maps`, () => {
        return HttpResponse.json(travelMapMockData);
    }),

    http.get(`${strapiApiUrl}/api/about-pages`, () => {
        return HttpResponse.json(aboutPageMockData);
    }),

    http.get(`${strapiApiUrl}/api/privacy-policy`, () => {
        return HttpResponse.json(privacyPolicyMockData);
    }),
];
