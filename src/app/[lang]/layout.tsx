import type { Metadata } from "next";
import { Oranienbaum } from 'next/font/google';
import {  GlobalStateProvider } from "@context/GlobalStateContext";
import { NavigationBar } from "@components/NavigationBar";
import { SearchField } from "@/components/SearchModule";
import Footer from "@/components/Footer";
import * as appConstants from "@utils/appConstants"
import "@styles/globals.scss";


const oranienbaum = Oranienbaum({
  weight: '400',
  subsets: ['latin'],
  display: 'swap', // Schriftart-Display-Einstellung: Nahtloser Übergang nach dem Laden der Schriftart
  preload: true, // Schriftart vorab laden
  variable: '--font-oranienbaum', // CSS-Variable definieren
});

// Dynamische Metadaten-Funktion
export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string}>
}): Promise<Metadata> {
  // Fallback auf Deutsch, falls Sprache nicht unterstützt wird
  const {lang} = await params;
  const meta = appConstants.metadataTranslations[lang] || 
                appConstants.metadataTranslations[appConstants.defaultLanguage];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: meta.author,
    creator: meta.developer ? meta.developer : undefined, // Optional, falls Entwicklerinformationen benötigt werden
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{lang: appConstants.SupportedLanguageType}>
}>) {
  
  const {lang} = await params;

  return (
    <html lang={lang} className={oranienbaum.variable}>
      <head>
        <link
          rel="prefetch"
          href={`/_next/static/css/app/${lang}/loading.css`}
          as="style"
        />
      </head>
      <body>
        <GlobalStateProvider initialLanguage={lang}>
            <div className="root-page">
              <header aria-label="Application header">
                <NavigationBar />
                <div className="header-underline"></div>
                <SearchField />
              </header>
              
              <main className="main-content" aria-label="Main content area">
                {children}
              </main>
              
              <footer aria-label="Application footer">
                <Footer />
              </footer>
            </div>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
