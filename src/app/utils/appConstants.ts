import { NavigationTitles, NavigationKey, NavBarIconProps, NavBarIconKeys } from "@/types/NavigationBarTypes";

// *** Unterstützte Sprachen (global) ***
export type SupportedLanguageType = "de" | "en" | "ru";
export const supportedLanguages: Array<SupportedLanguageType> = ["de", "en", "ru"];
export const defaultLanguage: SupportedLanguageType = supportedLanguages[0]; // Standardsprache als Fallback über Index definieren


// *** Angaben für die Metadaten ***
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


// *** Angaben für die NotFound-Seite ***
export const notFoundTranslations: Record<string, { title: string; description: string; backToHome: string }> = {
    de: {
        title: "Seite nicht gefunden",
        description: "Die gewünschte Seite existiert nicht oder wurde verschoben.",
        backToHome: "Zurück zur Startseite",
    },
    en: {
        title: "Page not found",
        description: "The requested page does not exist or has been moved.",
        backToHome: "Back to home",
    },
    ru: {
        title: "Страница не найдена",
        description: "Запрашиваемая страница не существует или была перемещена.",
        backToHome: "Вернуться на главную",
    },
  };

// *** Angaben für Fehlerseiten ***
export const errorNotificationTranslations: Record<string, { title: string; retry: string }> = {
  de: { title: "Ein Fehler ist aufgetreten", retry: "Erneut versuchen" },
  en: { title: "An error occurred", retry: "Try again" },
  ru: { title: "Произошла ошибка", retry: "Попробовать снова" },
};

// *** Angaben für die Navigationsleiste ***
export const navBarIconSize = 28; // Standardgröße für Icons in der Navigationsleiste in Pixel

// Eigenschaften zum Logo-Bild
export const appLogoImageProps = {
  src: "/assets/AppLogo.svg",
  alt: "App Logo",
  width: 50,
  height: 50,
  className: "navBarLogoImage",
};


// *** Angaben für die Navigationselemente ***
export const navBarIconProps: Record<NavBarIconKeys, NavBarIconProps> = {
  search: {
    src: "/assets/SearchIcon.svg",
    alt: "Search Icon",
    width: navBarIconSize,
    height: navBarIconSize,
  },
  menu: {
    src: "/assets/MenuIcon.svg",
    alt: "Menu Icon",
    width: navBarIconSize,
    height: navBarIconSize,
  },
  close: {
    src: "/assets/CloseIcon.svg",
    alt: "Close Icon",
    width: navBarIconSize,
    height: navBarIconSize,
  },
  close_search_field: {
    src: "/assets/CloseIcon_Search.svg",
    alt: "Close Search Field Icon",
    width: 16,
    height: 16,
  },
};

// Gesamttyp für das Übersetzungsobjekt
export type NavigationTitleTranslations = Record<SupportedLanguageType, NavigationTitles>;

export const navigationTitleTranslations: NavigationTitleTranslations = {
    de: {
        blogs: "Meine Reisen",
        about: "Über mich",
        contact: "Kontakt",
    },
    en: {
        blogs: "My Travels",
        about: "About me",
        contact: "Contact",
    },
    ru: {
        blogs: "Мои путешествия",
        about: "Обо мне",
        contact: "Контакт",
    },
  }

  export const navigationIds: Record<NavigationKey, string> = {
      blogs: "travel-blogs",
      about: "about",
      contact: "contact",
  };

  export const fallBackId: string = "home"; // Fallback-ID für die Navigation, wenn kein passendes Element gefunden wird
 
// *** Angaben für die Suchfunktion *** 
export const debounceDelay:number = 1500;     // Verzögerung für die Debounce-Funktion in Millisekunden
export const setAnimationDelay:number = 100;  // Verzögerung für die Animation in Millisekunden

export type SearchTitleTranslationsType = Record<SupportedLanguageType, { title: string }>;

export const searchTitleTranslations: SearchTitleTranslationsType = {
    de: {
      title: " Suche nach einem Reiseland ",
    },
    en: {
      title: " Search for a travel destination ",
    },
    ru: {
      title: " Поиск туристического направления ",
    },
};
