'use server';

import { headers } from 'next/headers';
import { createContactFormSchema, type SupportedLocale } from './validationContactForm';
import { ContactFormState, EmailResponse, EmailRequest, ContactFormData } from '@/types/contactFormTypes';
import * as appConstants from "@utils/appConstants"
import * as testParameters from '@e2e/utils/testParameters';

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
    console.error('Formularvalidierung fehlgeschlagen:', validation.error.flatten().fieldErrors);

    return {
      success: false,
      errors: validation.error.flatten().fieldErrors
    };
  }

  // reCAPTCHA-Verifikation
  const isRecaptchaValid = (process.env.PLAYWRIGHT_TEST_MODE === 'true') ? true : await verifyRecaptcha(validation.data.recaptchaToken || '');

  if (!isRecaptchaValid) {
    return {
      success: false,
      message: appConstants.verificationFailedMessages[locale],
      errors: { recaptcha: ['Verification failed'] }
    };
  }

  // E-Mail senden
  const serviceResponse = await sendContactEmail(validation.data);
  const errorMessage = (!serviceResponse.success && serviceResponse.code) ? appConstants.responseMessages[locale].failed[serviceResponse.code] : serviceResponse.error;
  const responseMessage = serviceResponse.success ? appConstants.responseMessages[locale].success : errorMessage;

  return {
    success: serviceResponse.success,
    message: responseMessage,
    code: serviceResponse.code ? serviceResponse.code : undefined,
  };
}

async function sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
  if (process.env.PLAYWRIGHT_TEST_MODE === 'true') {
    console.log(">> [TEST MODE] Senden der E-Mail wird simuliert.");

    if (!data.name || !data.email || !data.message) {
      return { success: false, error: "Fehlerhafte Anfrage.", code: testParameters.contactFormInputs.invalid.code };
    }
    return { success: true, messageId: "random-test-id", code: testParameters.contactFormInputs.valid.code };
  }

  try {
      const emailRequest: EmailRequest = {
        senderName: data.name.trim(),
        senderEmail: data.email.trim(),
        subject: `Nachricht von ${data.name}`,
        message: data.message.trim()
      };

      // Konfiguration aus Environment Variables
      const emailServiceUrl = process.env.EMAIL_SERVICE_URL || 'http://localhost:3005';
    
      if (!emailServiceUrl) {
        console.error('>> EMAIL_SERVICE_URL ist nicht konfiguriert');
        return { success: false, error: 'Email service URL is not configured', code: 400 };
      }

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailRequest),
        signal: AbortSignal.timeout(parseInt(process.env.REQUEST_TIMEOUT_MS || '30000')) // Request Timeout in ms
      };
      
      // HTTP-Request ausführen
      const response = await fetch(`${emailServiceUrl}/api/send-email`, requestOptions);

      if (!response.ok) {
        console.error(`E-Mail-Service HTTP Error: ${response.status} ${response.statusText}`);
        return { success: false, error: `E-Mail-Service HTTP Error: ${response.status} ${response.statusText}`, code: response.status };
      }
      const result: EmailResponse = await response.json();

      return result;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (errorObj: any) {
    // Error Handling
    const errorMessage: string = errorObj.message;
    console.error('Fehler beim Senden der E-Mail:', errorMessage);

    return { success: false, error: errorMessage, code: errorMessage.includes("fetch failed") ? 503 : 500};
  }
}
