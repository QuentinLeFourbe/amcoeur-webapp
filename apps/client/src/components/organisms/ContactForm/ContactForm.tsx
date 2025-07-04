import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { contactFormSchema, type ContactFormData } from "@amcoeur/types";
import { sendContactEmail } from "../../../api/emails";
import FormInput from "../../molecules/Form/FormInput";
import FormTextArea from "../../molecules/Form/FormTextArea";
import Form from "../../atoms/Form/Form";
import Button from "../../atoms/Button/Button";
import FormRow from "../../atoms/Form/FormRow";
import Captcha from "../../atoms/Captcha/Captcha";

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
    } catch (e) {
      console.error(e);
      return;
    } finally {
      reset();
      setDisplayConfirmation(true);
      recaptchaRef?.current?.reset();
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

      <FormInput
        {...register("city")}
        errorMessage={errors?.city?.message?.toString()}
      >
        Ville*
      </FormInput>
      <FormInput
        {...register("zipCode")}
        errorMessage={errors?.zipCode?.message?.toString()}
        pattern="\d+"
      >
        Code postal*
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
