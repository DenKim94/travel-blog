import type { Metadata } from "next";
import { Oranienbaum } from 'next/font/google';
import {  GlobalStateProvider } from "@context/GlobalStateContext";
import { NavigationBar } from "@components/NavigationBar";
import { SearchField } from "@/components/SearchModule";
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
  const meta = appConstants.metadataTranslations[lang] || appConstants.metadataTranslations[appConstants.defaultLanguage];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: appConstants.authorMetadata, 
    creator: appConstants.developerMetadata,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{lang: string}>
}>) {
  const {lang} = await params;
  console.log(`> Standardsprache: "${lang}"`);

  return (
    <html lang={lang ? lang : appConstants.defaultLanguage} className={oranienbaum.variable}>
      <body>
        <GlobalStateProvider>
            <div className="root-page">
              <header>
                <NavigationBar />
                <div className="header-underline"></div>
                <SearchField />
              </header>
              
              <main className="main-content">
                {children}
              </main>
              
              <footer>
                {<p> Placeholder-Footer </p>   /* To-Do: Komponente der Fußzeile */}
              </footer>
            </div>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
