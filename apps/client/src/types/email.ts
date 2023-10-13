export type ContactData = {
  name: string;
  firstname: string;
  mail: string;
  phone?: string | undefined;
  message: string;
  recaptchaToken: string;
};
