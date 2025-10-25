/**
 * Next.js Instrumentation API
 * Wird beim Server-Start einmal ausgeführt
 */
export async function register() {
    console.log('==========================================');
    console.log('🔍 INSTRUMENTATION.TS WIRD AUSGEFÜHRT');
    console.log('🔍 PLAYWRIGHT_TEST_MODE:', process.env.PLAYWRIGHT_TEST_MODE);
    console.log('==========================================');

    // Nur im Test-Modus MSW starten
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        console.log('🧪 Start of MSW for E2E-Tests ...');

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { setupServer } = require('msw/node');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { handlers } = require('../mocks/handlers'); 
    
    const server = setupServer(...handlers);

        server.listen({ onUnhandledRequest: 'bypass' });

        console.log('✅ MSW is running.');
    }
}

