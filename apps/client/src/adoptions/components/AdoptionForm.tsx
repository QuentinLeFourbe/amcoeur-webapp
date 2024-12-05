import { AdoptionContact, adoptionContactSchema } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Captcha from "../../global/components/atoms/Captcha/Captcha";
import Form from "../../global/components/atoms/Form/Form";
import FormRow from "../../global/components/atoms/Form/FormRow";
import FormInput from "../../global/components/molecules/Form/FormInput";
import FormTextArea from "../../global/components/molecules/Form/FormTextArea";
import { sendAdoptionEmail } from "../api/emails";

type AdoptionFormProps = {
  adoptionId: string;
};

function AdoptionForm({ adoptionId }: AdoptionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AdoptionContact>({
    resolver: zodResolver(adoptionContactSchema),
  });

  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const { t } = useTranslation();

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    register("token", { required: true });
  }, [register]);

  useEffect(() => {
    setValue("adoptionId", adoptionId);
  }, [adoptionId]);

  const submit = async (data: AdoptionContact) => {
    try {
      await sendAdoptionEmail(data);
      setDisplayConfirmation(true);
      reset();
      recaptchaRef?.current?.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormInput
        {...register("name")}
        errorMessage={errors?.name?.message?.toString()}
      >
        {t("form.name")}*
      </FormInput>
      <FormInput
        {...register("firstname")}
        errorMessage={errors?.firstname?.message?.toString()}
      >
        {t("form.firstname")}*
      </FormInput>
      <FormInput
        {...register("email")}
        errorMessage={errors?.email?.message?.toString()}
      >
        {t("form.email")}*
      </FormInput>
      <FormInput
        {...register("phone")}
        errorMessage={errors?.phone?.message?.toString()}
        pattern="\d+"
      >
        {t("form.phone")}*
      </FormInput>
      <FormRow>
        <FormTextArea
          {...register("motivation")}
          errorMessage={errors?.motivation?.message?.toString()}
        >
          {t("form.motivations")}*
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
          <p>{t("form.adoption.confirmation")}</p>
        </FormRow>
      )}
      <FormRow>
        <Button className={css({ alignSelf: "start" })} type="submit">
          {t("form.adoption.submit")}
        </Button>
      </FormRow>
    </Form>
  );
}

export default AdoptionForm;
