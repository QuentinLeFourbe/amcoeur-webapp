import { z } from "zod";

export const personalDataSchema = z.object({
  firstname: z.string().min(1, "Veuillez renseigner votre prénom"),
  name: z.string().min(1, "Veuillez renseigner votre nom"),
});

export const contactDataSchema = z.object({
  email: z.string().email("Veuillez renseigner un e-mail valide"),
  phone: z
    .string()
    .min(1, "Veuillez renseigner votre numéro de téléphone")
    .regex(
      /^\d+$/,
      "Le numéro de téléphone doit contenir uniquement des chiffres",
    ),
});

export const adressDataSchema = z.object({
  street: z.string().min(1, "Veuillez renseigner la rue"),
  postalCode: z
    .string()
    .min(1, "Veuillez renseigner le code postal")
    .regex(/^\d+$/, "Le code postal doit contenir uniquement des chiffres"),
  city: z.string().min(1, "Veuillez renseigner la ville"),
});

export const captchaTokenSchema = z.object({
  token: z.string().min(1, "Vous devez cocher cette case pour continuer"),
});

export const contactFormSchema = z
  .object({
    message: z.string().min(1, "Vous devez renseigner ce champs"),
  })
  .merge(personalDataSchema)
  .merge(contactDataSchema)
  .merge(captchaTokenSchema);

export const adoptionContactSchema = z
  .object({
    motivation: z.string().min(1, "Veuillez renseigner vos motivations"),
    adoptionId: z
      .string()
      .min(1, "Aucune adoption n'est relié à votre demande"),
  })
  .merge(personalDataSchema)
  .merge(contactDataSchema)
  .merge(captchaTokenSchema);

export type PersonalData = z.infer<typeof personalDataSchema>;
export type AddressData = z.infer<typeof adressDataSchema>;
export type ContactData = z.infer<typeof contactDataSchema>;
export type CaptchaToken = z.infer<typeof captchaTokenSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type AdoptionContact = z.infer<typeof adoptionContactSchema>;
