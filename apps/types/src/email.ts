export type PersonalData = {
  firstname: string;
  name: string;
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
  ContactData &
  CaptchaToken & {
    message: string;
  };

export type ReservationFormData = PersonalData &
  ContactData &
  CaptchaToken & {
    personCount: number;
    takeMeal: boolean;
    howDidYouHearAboutUs?: "facebook" | "display" | "hear" | "other";
    remark?: string;
  };
