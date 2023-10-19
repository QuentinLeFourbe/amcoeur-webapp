export type PersonalData = {
  gender: string;
  name: string;
  firstname: string;
};

export type AddressData = {
  street: string;
  postalCode: string;
  city: string;
};

export type ContactData = {
  mail: string;
  phone?: string | undefined;
};

export type CaptchaToken = {
  token: string;
};

export type ContactFormData = PersonalData &
  AddressData &
  ContactData &
  CaptchaToken & {
    message: string;
  };
