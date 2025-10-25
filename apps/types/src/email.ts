import { z } from "zod";

export const personalDataSchema = z.object({
  firstname: z.string().min(1, "Veuillez renseigner votre prénom"),
  name: z.string().min(1, "Veuillez renseigner votre nom"),
});

export const contactDataSchema = z.object({
  email: z
    .string()
    .min(1, "Veuillez renseigner votre adresse email")
    .email("Adresse email invalid"),
  phone: z
    .string()
    .regex(/^\d*$/, { message: "Veuillez renseigner uniquement des chiffres" })
    .refine((val) => val === "" || val.length >= 10, {
      message: "Le numéro de téléphone doit faire au minimum 10 caractères",
    })
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

export const locationDataSchema = z.object({
  zipCode: z
    .string()
    .min(1, { message: "Veuillez renseigner le code postal" })
    .regex(/^\d+$/),
  city: z.string().min(1, { message: "Veuillez renseigner la ville" }),
});

export const captchaTokenSchema = z.object({
  token: z
    .string()
    .min(1, { message: "Vous devez cocher cette case pour continuer" }),
});

export const contactFormSchema = z
  .object({
    message: z
      .string()
      .min(1, { message: "Vous devez renseigner un message à envoyer" }),
  })
  .merge(personalDataSchema)
  .merge(contactDataSchema)
  .merge(locationDataSchema)
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

export type LocationData = z.infer<typeof locationDataSchema>;

export type ContactData = z.infer<typeof contactDataSchema>;

export type CaptchaToken = z.infer<typeof captchaTokenSchema>;

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type AdoptionContact = z.infer<typeof adoptionContactSchema>;
