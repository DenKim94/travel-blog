// Unterstützte Sprachen (global)
export type SupportedLanguageType = "de" | "en" | "ru";
export const supportedLanguages: SupportedLanguageType[] = ['de', 'en', 'ru']; // Erster Eintrag ist die Standardsprache (siehe GlobalStateContext.tsx)

// Sprachübersetzungen für die Navigationsleiste
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
