'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useRef, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { submitContactForm } from '@/lib/actionsContactForm';
import { ContactFormState } from '@/types/contactFormTypes';
import styles from "@styles/components/contact-form.module.scss";
// import * as appConstants from "@utils/appConstants"


// TODO [30.08.2025]: Combine with GenericButton.tsx 
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={styles.submitButton}
    >
      {pending ? 'Wird gesendet...' : 'Nachricht senden'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState<ContactFormState, FormData>(
    submitContactForm,
    { success: false }
  );
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formular zurücksetzen nach erfolgreichem Versand
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      recaptchaRef.current?.reset();
    }
  }, [state.success]);

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Invisible reCAPTCHA ausführen
      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      
      if (recaptchaToken) {
        formData.append('recaptchaToken', recaptchaToken);
      }
      
      // Server Action aufrufen
      formAction(formData);
      
    } catch (error) {
      console.error('Fehler beim Absenden:', error);

    } finally {
      setIsSubmitting(false);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <h2>Kontakt aufnehmen</h2>
      
      {state.message && (
        <div className={`${styles.message} ${state.success ? styles.success : styles.error}`}>
          {state.message}
        </div>
      )}

      <form 
        ref={formRef}
        action={handleSubmit}
        className={styles.contactForm}
      >
        <div className={styles.formGroup}>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={state.errors?.name ? styles.inputError : ''}
            placeholder="Ihr vollständiger Name"
          />
          {state.errors?.name && (
            <span className={styles.errorMessage}>{state.errors.name[0]}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">E-Mail-Adresse *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={state.errors?.email ? styles.inputError : ''}
            placeholder="ihre@email.com"
          />
          {state.errors?.email && (
            <span className={styles.errorMessage}>{state.errors.email[0]}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Nachricht *</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className={state.errors?.message ? styles.inputError : ''}
            placeholder="Ihre Nachricht an uns..."
          />
          {state.errors?.message && (
            <span className={styles.errorMessage}>{state.errors.message[0]}</span>
          )}
        </div>

        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        />

        <SubmitButton />
      </form>
    </div>
  );
}
