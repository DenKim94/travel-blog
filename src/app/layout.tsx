import type { Metadata } from "next";
import { Oranienbaum } from 'next/font/google';
import {  GlobalStateProvider } from "@context/GlobalStateContext";
import "@styles/globals.scss";


const oranienbaum = Oranienbaum({
  weight: '400',
  subsets: ['latin'],
  display: 'swap', // Schriftart-Display-Einstellung: Nahtloser Übergang nach dem Laden der Schriftart
  preload: true, // Schriftart vorab laden
  variable: '--font-oranienbaum', // CSS-Variable definieren
});

export const metadata: Metadata = {
  title: "Reisen mit Nadja",
  description: "Der Reiseblog für Reisebegeisterte.",
  keywords: [
    "Reisen",
    "Reiseblog",
    "Reisetipps",
    "Reiseberichte",
    "Reiseziele",],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={oranienbaum.variable}>
      <body>
        <GlobalStateProvider>
          <div className="root-page">
            <header>
              {<p> Placeholder-Header </p>   /* To-Do: Komponente der Navigationsleiste */}
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
