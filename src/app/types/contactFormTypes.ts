

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
  recaptchaToken?: string;
}

export type ContactFormState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    recaptcha?: string[];
  };
  code?: number | undefined;
}

export type ValidationProps = {
    name_min: string,
    name_max: string,
    name_regex: string,
    email_invalid: string,
    email_max: string,
    message_min: string,
    message_max: string
} 

export type EmailResponse = {
  success: boolean;
  messageId?: string;
  error?: string;
  code?: number;
}

export type EmailRequest = {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}

