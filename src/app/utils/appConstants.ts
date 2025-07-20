import { NavigationTitles, NavigationKey, NavBarIconProps, NavBarIconKeys } from "@/types/NavigationBarTypes";
import { strapiLocaleType } from "@/types/strapiTypes";

// *** Unterstützte Sprachen (global) ***
export type SupportedLanguageType = "de" | "en" | "ru";
export const supportedLanguages: Array<SupportedLanguageType> = ["de", "en", "ru"];
export const defaultLanguage: SupportedLanguageType = supportedLanguages[0]; // Standardsprache als Fallback über Index definieren

export const languageOptions: Record<SupportedLanguageType, { strapiLanguageName: string; shortName: string; longName: string }> = {
  de: { strapiLanguageName: "de", shortName: "DEU", longName: "Deutsch" },
  en: { strapiLanguageName: "en", shortName: "ENG", longName: "English" },
  ru: { strapiLanguageName: "ru-RU", shortName: "RUS", longName: "Русский" },
};

export const strapiLocaleMapping: Record<SupportedLanguageType, string> = {
  de: "de",
  en: "en",
  ru: "ru-RU",
};

// *** Angaben für die Metadaten ***
type MetadataValues = {
  title: string;
  description: string;
  keywords: string[]; 
  author: { name: string }[];
  developer?: string; // Optional, falls Entwicklerinformationen benötigt werden
};

export const metadataTranslations: Record<SupportedLanguageType | string, MetadataValues> = {
  de: {
    title: "Reisen mit Nadja",
    description: "Der Reiseblog für Reisebegeisterte.",
    keywords: ["Reisen", "Reiseblog", "Reisetipps", "Reiseziele"],
    author: [{ name: "Nadja Ogaj"}],
    developer: "Denis Kim",
  },

  en: {
    title: "Travel with Nadja",
    description: "The travel blog for travelers.",
    keywords: ["Travel", "Travel blog", "Travel tips", "Destinations"],
    author: [{ name: "Nadja Ogaj"}],
    developer: "Denis Kim",
  },
  
  ru: {
    title: "Путешествия с Надей",
    description: "Блог о путешествиях для путешественников.",
    keywords: ["Путешествия", "Блог", "Советы", "Страны путешествий"],
    author: [{ name: "Надя Огай"}],
    developer: "Денис Ким",
  },
};

// *** Angaben für die Cookies und lokalen Speicher ***
type StorageSettings = {
    path: string;
    maxAge: number;
    sameSite: "Lax" | "Strict" | "None";
    storageKey: string;
};

export const storageSettings: StorageSettings = {
    path: "/", 
    maxAge: 60 * 60 * 2, // 2 Stunden
    sameSite: "Lax" as const,
    storageKey: "preferred-language",
};

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

export const contentNotFoundImageUrl: string = "/assets/ContentNotFound.png";
export const notFoundImgDefaultSize: number = 340; // Größe des Bildes in Pixel

// *** Angaben für Fehlerseiten ***
export const errorNotificationTranslations: Record<string, { title: string; retry: string }> = {
  de: { title: "Ein Fehler ist aufgetreten:", retry: "Erneut versuchen" },
  en: { title: "An error occurred:", retry: "Try again" },
  ru: { title: "Произошла ошибка:", retry: "Попробовать снова" },
};

// *** Angaben für die Navigationsleiste ***
export const navBarIconSize = 28; // Standardgröße für Icons in der Navigationsleiste in Pixel
export const windowUpdateDelay_ms = 60;

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
        blogs: "My travels",
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
export const debounceDelay:number = 800;     // Verzögerung für die Debounce-Funktion in Millisekunden
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
      title: " Поиск по стране путешествия ",
    },
};

export const searchLoaderTranslations: SearchTitleTranslationsType = {
    de: {
      title: " Suche läuft ... ",
    },
    en: {
      title: " Search is running ... ",
    },
    ru: {
      title: " Поиск ... ",
    },
};

// *** Angaben für die Landing-Page *** 
export const LANDING_PAGE_ALT_TEXT: string = "Landing page title image";
export const TRAVEL_MAP_ALT_TEXT: string = "Travel map image";
export const BLOG_POST_ALT_TEXT: string = "Blog post title image: ";

// *** Angaben für die Blogpost-Page *** 
export const IN_VIEW_THRESHOLD: number = 0.25;
export const indexCardTitleImage: number = 0;
export const blogCardButtonText: Record<strapiLocaleType, string> = { "de": "Mehr lesen", "en": "Read more", "ru-RU": "Подробнее" };
export const imgDefaultSizes: string = "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw";
