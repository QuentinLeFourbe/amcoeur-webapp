import { useForm } from "react-hook-form";
import { sendContactEmail } from "../../../api/emails";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "../../atoms/Form/FormInput";
import FormTextArea from "../../atoms/Form/FormTextArea";
import Form from "../../atoms/Form/Form";
import Button from "../../atoms/Button/Button";
import FormRow from "../../atoms/Form/FormRow";
import Captcha from "../../atoms/Captcha/Captcha";
import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ContactFormData } from "@amcoeur/types";

const schema = yup
  .object({
    gender: yup.string().required("Civilité est requise"),
    name: yup.string().required("Nom est requis"),
    firstname: yup.string().required("Prénom est requis"),
    mail: yup
      .string()
      .required("Email est requis")
      .email("Adresse email invalide"),
    phone: yup
      .string()
      .matches(
        /^\d+$/,
        "Le numéro de téléphone doit contenir uniquement des chiffres"
      )
      .min(10, "Votre numéro de téléphone doit avoir au moins 10 chiffres")
      .max(15, "Votre numéro de téléphone doit avoir 15 chiffres ou moins"),
    message: yup.string().required("Message est requis"),
    token: yup.string().required("La validation reCaptcha est requise"),
  })
  .required();

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  useEffect(() => {
    register("token", { required: true });
  }, [register]);

  const onSubmit = (data: ContactFormData) => {
    try {
      sendContactEmail(data);
    } catch (e) {
      console.error(e);
      return;
    } finally {
      reset();
      recaptchaRef?.current?.reset();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        {...register("name")}
        errorMessage={errors.name && errors.name.message}
      >
        Nom*
      </FormInput>
      <FormInput
        {...register("firstname")}
        errorMessage={errors.firstname && errors.firstname.message}
      >
        Prénom*
      </FormInput>
      <FormInput
        {...register("mail")}
        errorMessage={errors.mail && errors.mail.message}
      >
        Email*
      </FormInput>
      <FormInput
        {...register("phone")}
        errorMessage={errors.phone && errors.phone.message}
      >
        Téléphone
      </FormInput>
      <FormRow>
        <FormTextArea
          {...register("message")}
          errorMessage={errors.message && errors.message.message}
        >
          Message
        </FormTextArea>
      </FormRow>
      <FormRow>
        <Captcha
          ref={recaptchaRef}
          setFormValue={(value: string): void => setValue("token", value)}
          errorMessage={errors.token && errors.token.message}
        />
      </FormRow>
      <FormRow centerContent>
        <Button type="submit">Envoyer</Button>
      </FormRow>
    </Form>
  );
}
