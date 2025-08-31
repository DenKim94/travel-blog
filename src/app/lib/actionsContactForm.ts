'use server';

import { headers } from 'next/headers';
import { createContactFormSchema, type SupportedLocale } from './validationContactForm';
import { ContactFormState } from '@/types/contactFormTypes';
import * as appConstants from "@utils/appConstants"

/**
 * Liest die Sprache aus den HTTP-Headern und gibt sie als `SupportedLocale` zurück.
 * Wenn die Sprache nicht in den Headern enthalten ist oder nicht unterstützt wird,
 * wird die Standardsprache (`defaultLanguage`) zurückgegeben.
 *
 * Hinweis: Die Sprache wird aus dem `x-locale` Header der Anfrage gelesen und muss dort vorhanden sein.
 *
 * @returns Die erkannte Sprache (`SupportedLocale`).
 * @throws Wenn ein Fehler auftritt, wird die Standardsprache (`defaultLanguage`) zurückgegeben.
 */
async function getLocaleFromHeaders(): Promise<SupportedLocale> {
  try {
    const locale = (await headers()).get('x-locale') || appConstants.defaultLanguage;

    return locale as SupportedLocale;

  } catch (error) {
    console.error('Fehler beim Abrufen der Sprache aus den Headern:', error);
    return appConstants.defaultLanguage as SupportedLocale;
  }
}

/**
 * Verifiziert den reCAPTCHA-Token, der von der Kontaktformular-Komponente
 * übergeben wurde.
 *
 * Wenn der Token leer ist, wird `false` zurückgegeben.
 *
 * Im Erfolgsfall wird die Antwort der reCAPTCHA-API abgerufen und die
 * `success`-Eigenschaft des Antwortobjekts wird zurückgegeben.
 *
 * Wenn ein Fehler auftritt, wird `false` zurückgegeben und der Fehler wird
 * in der Konsole ausgegeben.
 *
 * @param {string} token - Der reCAPTCHA-Token, der von der Kontaktformular-Komponente
 * übergeben wurde.
 * @returns {Promise<boolean>} - `true`, wenn der Token gültig ist, sonst `false`.
 */
async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!token) return false;
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    });
    
    const data = await response.json();
    return data.success === true;

  } catch (error) {
    console.error('reCAPTCHA-Verifikation fehlgeschlagen:', error);
    return false;
  }
}

/**
 * Server-seitige Aktion zum Verarbeiten von Kontaktformularen.
 *
 * Die Aktion validiert die Formulardaten mit lokalisierten Fehlermeldungen,
 * führt die reCAPTCHA-Verifikation durch und sendet die E-Mail anhand der
 * bereitgestellten Formulardaten.
 *
 * @param {ContactFormState} prevState - Der vorherige Status des Formulars.
 * @param {FormData} formData - Die Formulardaten, die an den Server gesendet wurden.
 * @returns {Promise<ContactFormState>} Ein Promise, das den neuen Status des Formulars zurückgibt.
 */
export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {

  const locale = await getLocaleFromHeaders();
  console.log('@submitContactForm - Erkannte Sprache:', locale);
  const contactFormSchema = createContactFormSchema(locale);

  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
    recaptchaToken: formData.get('recaptchaToken') as string
  };

  // Validierung mit lokalisierten Fehlermeldungen
  const validation = contactFormSchema.safeParse(rawData);
  
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors
    };
  }

  // reCAPTCHA-Verifikation
  const isRecaptchaValid = await verifyRecaptcha(validation.data.recaptchaToken || '');

  if (!isRecaptchaValid) {
    return {
      success: false,
      message: appConstants.verificationFailedMessages[locale],
      errors: { recaptcha: ['Verification failed'] }
    };
  }

  // E-Mail senden (Ihre Backend-Integration)
  const emailSent = await sendContactEmail(validation.data);

  const responseMessage = emailSent ? appConstants.responseMessages[locale].success : appConstants.responseMessages[locale].failed;

  return {
    success: emailSent,
    message: responseMessage
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendContactEmail(data: any): Promise<boolean> {
  // Simuliere das Senden der E-Mail
  await new Promise((resolve) => setTimeout(resolve, 5000));
  
  // TODO [31.08.2025]: Anfrage an E-Mail-Service integrieren
  console.log('Sende E-Mail mit den folgenden Daten:', data);

  return true;
}
