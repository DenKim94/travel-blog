'use client';

import { useRef, useEffect, useTransition, useActionState, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';
import { submitContactForm } from '@/lib/actionsContactForm';
import { ContactFormState } from '@/types/contactFormTypes';
import  GenericButton from "./GenericButton";
import PopUp from './PopUp';
import styles from "@styles/components/contact-form.module.scss";
import * as appConstants from "@utils/appConstants"
import { useGlobalState } from '@/context/GlobalStateContext';

export default function ContactForm() {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    { success: false }
  );

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { language } = useGlobalState();  
  const [isPending, startTransition] = useTransition();
  const [showPopUp, setShowPopUp] = useState(false);
  const [popupErrorMessage, setPopupErrorMessage] = useState<string | null>(null);

  // Formular zurücksetzen nach erfolgreichem Versand
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }

  }, [state.success]);

  // Validierungsfehler überwachen und setzen
  useEffect(() => {
    if (state.errors?.name) {
      setPopupErrorMessage(state.errors.name[0]);

    } else if (state.errors?.email) {
      setPopupErrorMessage(state.errors.email[0]);

    } else if (state.errors?.message) {
      setPopupErrorMessage(state.errors.message[0]);

    } else if (state.message && !state.success) {
      setPopupErrorMessage(state.message);

    } else {
      setPopupErrorMessage(null);
    }

  }, [state.errors, state.message, state.success]);

  // PopUp Sichtbarkeit steuern
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if(!isPending){
      setShowPopUp(true);

      // Timer für automatisches Ausblenden
      timer = setTimeout(() => {
        setShowPopUp(false);

      }, appConstants.popupTimeout_ms);

    }else{
      setShowPopUp(false);
    }

    // Cleanup-Funktion: Timer löschen
    return () => {
      if (timer) clearTimeout(timer);
    };

  }, [isPending]);

  // reCAPTCHA-Reset nur bei Unmount
  useEffect(() => {
    return () => {
      try {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        recaptchaRef.current?.reset();

      } catch (error) {
        console.error('>> Cleanup error:', error);
      }
    };
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      if (recaptchaToken) {
        formData.append('recaptchaToken', recaptchaToken);
      }
      
      // Manuell in startTransition wrappen
      startTransition(() => {
        formAction(formData);
      });
      
    } catch (error) {
      console.error('reCAPTCHA-Fehler:', error);
      try {
        recaptchaRef.current?.reset();
      } catch (resetError) {
        console.debug('reCAPTCHA reset bei Fehler:', resetError);
      }
    }
  };

  return (
    <div className={styles.contactFormContainer}>      
      <form 
        ref={formRef}
        action={handleSubmit}
        className={styles.contactForm}
      >
        <div className={styles.formGroup}>
          <label htmlFor="name">{appConstants.contactFormFieldNames[language].name}</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={state.errors?.name ? styles.inputError : ''}
            placeholder={appConstants.contactFormPlaceholders[language].name}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">{appConstants.contactFormFieldNames[language].email}</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={state.errors?.email ? styles.inputError : ''}
            placeholder={appConstants.contactFormPlaceholders[language].email}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">{appConstants.contactFormFieldNames[language].message}</label>
          <textarea
            id="message"
            name="message"
            required
            className={state.errors?.message ? styles.inputError : ''}
            placeholder={appConstants.contactFormPlaceholders[language].message}
          />
        </div>

        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          badge="bottomright"
        />

        {/* Checkbox für die Datenschutzbestimmungen */}
        <div className="data-privacy-container" style={{ display: 'flex', alignItems: 'center'}}>
            <input 
                type="checkbox" 
                className="checkbox-data-privacy"
                data-testid="data-privacy-checkbox" 
                style={{ marginRight: '8px' }} 
                required
            />
            <label style={{ fontSize: '1rem' }}>
                {appConstants.privacyConsentTranslations[language].text}{" "} 
                <Link href="/privacy-policy" style={{ color: 'black', textDecoration: 'underline'}}> 
                  {appConstants.privacyConsentTranslations[language].linkText}{" "}
                </Link>
                {appConstants.privacyConsentTranslations[language].suffix}
            </label>
        </div>

        {/* Senden Button */}
        <GenericButton
          type="submit"
          style={{ fontSize: '1.1rem' }}
          disabled={isPending}
          title={isPending ? appConstants.sendButtonTitle[language].isPending : appConstants.sendButtonTitle[language].done}
        />
      </form>

      {state.success && (
        <PopUp message={state.message} visible={showPopUp} type="success" />
      )}

      {popupErrorMessage && (
        <PopUp message={popupErrorMessage} visible={showPopUp} type="error" />
      )}
    </div>
  );
}
