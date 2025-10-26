/**
 * Next.js Instrumentation API
 * Wird beim Server-Start einmal ausgeführt
 */
export async function register() {

    // Nur im Test-Modus MSW starten
    if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.PLAYWRIGHT_TEST_MODE === 'true') {
        
        console.log('==========================================');
        console.log('🧪 Start of MSW for E2E-Tests ...');

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { setupServer } = require('msw/node');
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { handlers } = require('../mocks/handlers'); 
        
        const server = setupServer(...handlers);

        server.listen({ onUnhandledRequest: 'bypass' });

        console.log('✅ MSW is running.');
        console.log('==========================================');
    }
}

