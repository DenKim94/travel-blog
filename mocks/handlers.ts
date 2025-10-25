import { http, HttpResponse } from 'msw';
import { landingPageMockData } from '../e2e/utils/testParameters';

const strapiApiUrl = process.env.STRAPI_PUBLIC_URL;

export const handlers = [
    // Strapi Landing Page mocken
    http.get(`${strapiApiUrl}/api/landing-pages`, ({ request }) => {
        const url = new URL(request.url);
        const locale = url.searchParams.get('locale');
        
        console.log('🟡 MSW: Abgefangener Request für locale:', locale);
        
        return HttpResponse.json(landingPageMockData);
    }),

    // Weitere Endpoints mocken
    // http.get(`${strapiApiUrl}/api/landing-pages`, () => {
    //     return HttpResponse.json({  [], meta: {} });
    // }),

    // http.get(`${strapiApiUrl}/api/travel-maps`, () => {
    //     return HttpResponse.json({  [], meta: {} });
    // }),

    // http.get(`${strapiApiUrl}/api/about-pages`, () => {
    //     return HttpResponse.json({  [], meta: {} });
    // }),
];

export const errorHandlers = [
    http.get(`${strapiApiUrl}/api/landing-pages`, () => {
        return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }),
];
