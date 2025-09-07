import { NavigationTitles, NavigationKey, NavBarIconProps, NavBarIconKeys } from "@/types/NavigationBarTypes";
import { ValidationProps } from "@/types/contactFormTypes";
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

export const defaultMetadataBlogPost: Record<SupportedLanguageType | string, MetadataValues> = {
  de: {
    title: "Reisen mit Nadja",
    description: "Der Reiseblog für Reisebegeisterte.",
    keywords: ["Reisen", "Reiseblog", "Reisetipps", "Reiseziele"],
    author: [{ name: "Nadja Ogaj"}],
  },

  en: {
    title: "Travel with Nadja",
    description: "The travel blog for travelers.",
    keywords: ["Travel", "Travel blog", "Travel tips", "Destinations"],
    author: [{ name: "Nadja Ogaj"}],
  },
  
  ru: {
    title: "Путешествия с Надей",
    description: "Блог о путешествиях для путешественников.",
    keywords: ["Путешествия", "Блог", "Советы", "Страны путешествий"],
    author: [{ name: "Надя Огай"}],
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

// *** Angaben für die NotFound-Komponente ***
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

export const contentNotFoundImageUrl: string  = "/assets/ContentNotFound.png";
export const searchNotFoundImageUrl: string   = "/assets/SearchNotFound.jpeg";
export const notFoundImgDefaultSize: number   = 340; // Größe des Bildes in Pixel

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
export const IN_VIEW_THRESHOLD: number = 0.15;
export const indexCardTitleImage: number = 0;
export const blogCardButtonText: Record<strapiLocaleType, string> = { "de": "Mehr lesen", "en": "Read more", "ru-RU": "Подробнее" };
export const imgDefaultSizes: string = "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw";

// *** Angaben für den Swipe-Icon ***
export const SWIPE_ICON_URL: string = "/assets/SwipeIcon.svg";
export const SWIPE_ICON_ALT_TEXT: string = "Swipe Icon";
export const SWIPE_ICON_WIDTH: number = 50;
export const SWIPE_ICON_HEIGHT: number = 50;

// *** Angaben für die About-Page *** 
export const ABOUT_PAGE_ALT_TEXT: string = "About page title image";
export const PROFILE_IMAGE_ALT_TEXT: string = "Profile image";

// *** Angaben für das Kontaktformular ***
export const popupTimeout_ms: number = 5000;

export type validationTranslationsType = Record<SupportedLanguageType, ValidationProps>;
export const minNameLength : number = 2;
export const maxNameLength : number = 50;
export const minMessageLength : number = 10;
export const maxMessageLength : number = 2000;
export const maxEmailLength : number = 100;

export const validationTranslations : validationTranslationsType = {
  de: {
    name_min: `Name muss mindestens ${minNameLength} Zeichen lang sein`,
    name_max: `Name darf maximal ${maxNameLength} Zeichen lang sein`, 
    name_regex: 'Name enthält ungültige Zeichen',
    email_invalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    email_max: 'E-Mail-Adresse ist zu lang',
    message_min: `Nachricht muss mindestens ${minMessageLength} Zeichen lang sein`,
    message_max: `Nachricht darf maximal ${maxMessageLength} Zeichen lang sein`
  },
  en: {
    name_min: `Name must be at least ${minNameLength} characters long`,
    name_max: `Name must be at most ${maxNameLength} characters long`,
    name_regex: 'Name contains invalid characters', 
    email_invalid: 'Please enter a valid email address',
    email_max: 'Email address is too long',
    message_min: `Message must be at least ${minMessageLength} characters long`,
    message_max: `Message must be at most ${maxMessageLength} characters long`
  },
  ru: {
    name_min: `Имя должно содержать не менее ${minNameLength} символов`,
    name_max: `Имя не должно превышать ${maxNameLength} символов`,
    name_regex: 'Имя содержит недопустимые символы',
    email_invalid: 'Пожалуйста, введите действительный адрес электронной почты', 
    email_max: 'Адрес электронной почты слишком длинный',
    message_min: `Сообщение должно содержать не менее ${minMessageLength} символов`,
    message_max: `Сообщение должно содержать не более ${maxMessageLength} символов`
  }
}

// *** Platzhalter für das Kontaktformular ***
export const contactFormPlaceholders: Record<SupportedLanguageType, { name: string; email: string; message: string }> = {
  de: {
    name: 'Ihr Name',
    email: 'Ihre E-Mail-Adresse',
    message: 'Ihre Nachricht'
  },
  en: {
    name: 'Your Name',
    email: 'Your Email Address',
    message: 'Your Message'
  },
  ru: {
    name: 'Ваше имя',
    email: 'Ваш адрес электронной почты',
    message: 'Ваше сообщение'
  }
};

export const contactFormFieldNames: Record<SupportedLanguageType, { name: string; email: string; message: string }> = {
  de: {
    name: 'Name',
    email: 'Ihre E-Mail-Adresse',
    message: 'Ihre Nachricht'
  },
  en: {
    name: 'Name',
    email: 'Email Address',
    message: 'Message'
  },
  ru: {
    name: 'Имя',
    email: 'Адрес электронной почты',
    message: 'Сообщение'
  }
};

export const sendButtonTitle: Record<SupportedLanguageType, { isPending: string; done: string}> = {
  de: { isPending: 'Wird gesendet...', done: 'Senden' },
  en: { isPending: 'Sending...', done: 'Send' },
  ru: { isPending: 'Отправка...', done: 'Отправить' }
};

// *** Angaben für die CAPTCHA-Rückmeldung ***
export const verificationFailedMessages: Record<SupportedLanguageType, string> = {
  de: 'Die reCAPTCHA-Überprüfung ist fehlgeschlagen.',
  en: 'The reCAPTCHA verification failed.',
  ru: 'Проверка reCAPTCHA не удалась.'
};

// *** Angaben für die Rückmeldung nach dem Absenden einer Nachricht ***
export const responseMessages: Record<SupportedLanguageType, { success: string; failed: Record<number, string> }> = {
  de: {
    success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.',
    failed: { 
              500: 'Serverfehler. Bitte versuchen Sie es später erneut.',
              503: 'Der E-Mail-Service ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.',
              400: 'Fehlerhafte Anfrage. Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.',
              403: 'Anfrage für diesen Absender ist verweigert.',
              404: 'Fehlerhafte Anfrage. Zieladresse ist ungültig.'
            } 
  },

  en: {
    success: 'Thank you! Your message has been sent successfully.',
    failed: { 
              500: 'Error sending message. Please try again later.',
              503: 'The email service is currently unavailable. Please try again later.',
              400: 'Bad request. Please check your input and try again.',
              403: 'Request from this sender is denied.',
              404: 'Bad request. The target address is invalid.'
            }
  },

  ru: {
    success: 'Спасибо! Ваше сообщение было успешно отправлено.',
    failed: { 
              500: 'Ошибка отправки сообщения. Пожалуйста, попробуйте позже.',
              503: 'Сервис электронной почты в настоящее время недоступен. Пожалуйста, попробуйте позже.',
              400: 'Некорректный запрос. Пожалуйста, проверьте свои данные и попробуйте снова.',
              403: 'Запрос от этого отправителя отклонен.',
              404: 'Некорректный запрос. Целевой адрес недействителен.'
            }
  }
};

// *** Angaben für die Datenschutzbestimmungen ***
export const privacyConsentTranslations: Record<SupportedLanguageType, { text: string; linkText: string; suffix: string; href: string }> = {
  de: {
    text: 'Ich stimme den',
    linkText: 'Datenschutzbestimmungen',
    suffix: 'zu.',
    href: '/de/datenschutz.html'
  },
  en: {
    text: 'I agree to the',
    linkText: 'privacy policy',
    suffix: '.',
    href: '/en/privacy-policy.html'
  },
  ru: {
    text: 'Я соглашаюсь с',
    linkText: 'политикой конфиденциальности',
    suffix: '.',
    href: '/ru/privacy-policy.html'
  }
} 
