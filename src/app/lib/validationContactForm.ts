import { z } from 'zod';
import * as appConstants from "@utils/appConstants"


export type SupportedLocale = keyof typeof appConstants.validationTranslations;
export type ValidationKey = keyof typeof appConstants.validationTranslations['de'];

/**
 * Gibt die Übersetzung einer Validierungs-Nachricht für die gegebene
 * Sprache und den gegebenen Schlüssel zurück.
 *
 * Wenn die angegebene Sprache nicht unterstützt wird, wird die
 * Übersetzung für die Standardsprache verwendet.
 *
 * @param {SupportedLocale} locale - Die zu verwendende Sprache.
 * @param {ValidationKey} key - Der Schlüssel der zu übersetzenden Nachricht.
 * @returns {string} Die Übersetzung der Nachricht.
 */
function getValidationTranslation(locale: SupportedLocale, key: ValidationKey): string {
  return appConstants.validationTranslations[locale]?.[key] || appConstants.validationTranslations[appConstants.defaultLanguage][key];
}

/**
 * Erstellt ein zod-Schema für die Kontaktformulardaten, das die angegebene
 * Sprache unterstützt.
 *
 * Die Validierung der Formulardaten wird anhand der im Schema definierten
 * Regeln durchgeführt. Die Error-Messages werden in der `validationTranslations`
 * Konstante definiert.
 *
 * @param locale Die gewünschte Sprache (z.B. 'de', 'en', 'ru'). Standardmäßig
 * wird die `defaultLanguage` verwendet.
 * @returns Ein zod-Schema, das die Kontaktformulardaten validiert.
 */
export function createContactFormSchema(locale: SupportedLocale = appConstants.defaultLanguage) {
  
  return z.object({
    name: z
      .string()
      .min(appConstants.minNameLength, { message: getValidationTranslation(locale, 'name_min') })
      .max(appConstants.maxNameLength, { message: getValidationTranslation(locale, 'name_max') })
      .regex(/^[a-zA-ZäöüÄÖÜßа-яёА-ЯЁ\s-]+$/, { message: getValidationTranslation(locale, 'name_regex') }),

    email: z
      .string() 
      .email({ message: getValidationTranslation(locale, 'email_invalid') })
      .max(appConstants.maxEmailLength, { message: getValidationTranslation(locale, 'email_max') }),

    message: z
      .string()
      .min(appConstants.minMessageLength, { message: getValidationTranslation(locale, 'message_min') })
      .max(appConstants.maxMessageLength, { message: getValidationTranslation(locale, 'message_max') })
      .trim(),
    
    recaptchaToken: z.string().optional()
  });
}

export type ContactFormSchema = z.infer<ReturnType<typeof createContactFormSchema>>;
