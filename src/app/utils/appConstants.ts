// Unterstützte Sprachen (global)
export type SupportedLanguageType = "de" | "en" | "ru";
export const supportedLanguages: SupportedLanguageType[] = ["de", "en", "ru"];
export const defaultLanguage: SupportedLanguageType = supportedLanguages[0]; // Standardsprache als Fallback definieren


// Übersetzungen für Metadaten
export const metadataTranslations: Record<string, { title: string; description: string; keywords: string[] }> = {
  de: {
    title: "Reisen mit Nadja",
    description: "Der Reiseblog für Reisebegeisterte.",
    keywords: ["Reisen", "Reiseblog", "Reisetipps", "Reiseziele"],
  },
  en: {
    title: "Travel with Nadja",
    description: "The travel blog for travel enthusiasts.",
    keywords: ["Travel", "Travel blog", "Travel tips", "Destinations"],
  },
  ru: {
    title: "Путешествия с Надей",
    description: "Блог для любителей путешествий.",
    keywords: ["Путешествия", "Блог", "Советы", "Направления"],
  },
};

export const authorMetadata = [{ name: "Nadja Ogaj"}];  // Angaben zum Autor
export const developerMetadata = "Denis Kim";           // Angaben zum Entwickler

// Übersetzungen für die Navigationsleiste
export const navTranslations = {
    de: {
        home: "Startseite",
        blogs: "Blogs",
        about: "Über mich",
        contact: "Kontakt",
    },
    en: {
        home: "Home",
        blogs: "Blogs",
        about: "About me",
        contact: "Contact",
    },
    ru: {
        home: "Главная",
        blogs: "Блоги",
        about: "Обо мне",
        contact: "Контакты",
    },
  }
