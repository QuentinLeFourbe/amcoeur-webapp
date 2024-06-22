import {
  AddressData,
  CaptchaToken,
  ContactData,
  PersonalData,
} from "@amcoeur/types";
import * as yup from "yup";

export const personalDataSchema: yup.ObjectSchema<PersonalData> = yup
  .object()
  .shape({
    firstname: yup.string().required("Veuillez renseigner votre prénom"),
    name: yup.string().required("Veuillez renseigner votre nom"),
  });

export const contactDataSchema: yup.ObjectSchema<ContactData> = yup
  .object()
  .shape({
    mail: yup
      .string()
      .required("Veuiilez renseigner votre adresse email")
      .email("Adresse email invalide"),
    phone: yup
      .string()
      .matches(
        /^\d+$/,
        "Le numéro de téléphone doit contenir uniquement des chiffres",
      )
      .min(10, "Votre numéro de téléphone doit avoir au moins 10 chiffres")
      .max(15, "Votre numéro de téléphone doit avoir 15 chiffres ou moins"),
  });

export const addressDataSchema: yup.ObjectSchema<AddressData> = yup
  .object()
  .shape({
    street: yup.string().required("Veuillez renseigner la rue"),
    postalCode: yup
      .string()
      .matches(/^\d+$/, "Le code postal doit contenir uniquement des chiffres")
      .required("Veuilley renseigner le code postal"),
    city: yup.string().required("Veuillez renseigner la ville"),
  });

export const captchaTokenSchema: yup.ObjectSchema<CaptchaToken> = yup
  .object()
  .shape({
    token: yup.string().required("Vous devez cocher cette case pour continuer"),
  });
