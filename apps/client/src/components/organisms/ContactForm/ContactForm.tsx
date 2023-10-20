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
import type { ContactFormData } from "@amcoeur/types";
import {
  captchaTokenSchema,
  contactDataSchema,
  personalDataSchema,
} from "../../../schema/form";
import { merge } from "../../../utils/schema";

const contactFormSchema = yup.object().shape({
  message: yup.string().required("Message est requis"),
});

const contactFormMergedSchema: yup.ObjectSchema<ContactFormData> = merge(
  personalDataSchema,
  contactDataSchema,
  captchaTokenSchema,
  contactFormSchema
) as yup.ObjectSchema<ContactFormData>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactFormMergedSchema),
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
        register={register("name")}
        errorMessage={errors?.name?.message?.toString()}
      >
        Nom*
      </FormInput>
      <FormInput
        register={register("firstname")}
        errorMessage={errors?.firstname?.message?.toString()}
      >
        Prénom*
      </FormInput>
      <FormInput
        register={register("mail")}
        errorMessage={errors?.mail?.message?.toString()}
      >
        Email*
      </FormInput>
      <FormInput
        register={register("phone")}
        errorMessage={errors?.phone?.message?.toString()}
      >
        Téléphone
      </FormInput>
      <FormRow>
        <FormTextArea
          register={register("message")}
          errorMessage={errors?.message?.message?.toString()}
        >
          Message
        </FormTextArea>
      </FormRow>
      <FormRow>
        <Captcha
          ref={recaptchaRef}
          setFormValue={(value: string): void => setValue("token", value)}
          errorMessage={errors?.token?.message?.toString()}
        />
      </FormRow>
      <FormRow centerContent>
        <Button type="submit">Envoyer</Button>
      </FormRow>
    </Form>
  );
}
