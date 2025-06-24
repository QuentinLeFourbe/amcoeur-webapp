import { type ContactFormData,contactFormSchema } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";

import { sendContactEmail } from "../../../api/emails";
import Button from "../../atoms/Button/Button";
import Captcha from "../../atoms/Captcha/Captcha";
import Form from "../../atoms/Form/Form";
import FormRow from "../../atoms/Form/FormRow";
import FormInput from "../../molecules/Form/FormInput";
import FormTextArea from "../../molecules/Form/FormTextArea";


export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  useEffect(() => {
    register("token", { required: true });
  }, [register]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendContactEmail(data);
      reset();
      setDisplayConfirmation(true);
      recaptchaRef?.current?.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        {...register("name")}
        errorMessage={errors?.name?.message?.toString()}
      >
        Nom*
      </FormInput>
      <FormInput
        {...register("firstname")}
        errorMessage={errors?.firstname?.message?.toString()}
      >
        Prénom*
      </FormInput>
      <FormInput
        {...register("email")}
        errorMessage={errors?.email?.message?.toString()}
      >
        Email*
      </FormInput>
      <FormInput
        {...register("phone")}
        errorMessage={errors?.phone?.message?.toString()}
        pattern="\d+"
      >
        Téléphone
      </FormInput>
      <FormRow>
        <FormTextArea
          {...register("message")}
          errorMessage={errors?.message?.message?.toString()}
        >
          Message*
        </FormTextArea>
      </FormRow>
      <FormRow>
        <Captcha
          ref={recaptchaRef}
          setFormValue={(value: string): void => setValue("token", value)}
          errorMessage={errors?.token?.message?.toString()}
        />
      </FormRow>
      {displayConfirmation && (
        <FormRow>
          <p>Votre message a bien été envoyé</p>
        </FormRow>
      )}
      <FormRow centerContent>
        <Button type="submit">Envoyer</Button>
      </FormRow>
    </Form>
  );
}
