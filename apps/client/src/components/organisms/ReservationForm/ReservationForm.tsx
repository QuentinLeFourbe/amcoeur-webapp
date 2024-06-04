import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import type { ReservationFormData } from "@amcoeur/types";

import FormInput from "../../molecules/Form/FormInput";
import FormTextArea from "../../molecules/Form/FormTextArea";
import Form from "../../atoms/Form/Form";
import Button from "../../atoms/Button/Button";
import FormRow from "../../atoms/Form/FormRow";
import Captcha from "../../atoms/Captcha/Captcha";
import {
  captchaTokenSchema,
  contactDataSchema,
  personalDataSchema,
} from "../../../schema/form";
import { merge } from "../../../utils/schema";
import FormCheckbox from "../../molecules/Form/FormCheckbox";
import FormSelect from "../../molecules/Form/FormSelect";

const reservationFormSchema = yup.object().shape({
  personCount: yup
    .number()
    .min(1, "Nombre de personne minimum 1")
    .max(10, "Nombre de personnes maximum 10")
    .required("Veuillez indiquer le nombre de personnes"),
  takeMeal: yup.boolean(),
  howDidYouHearAboutUs: yup.string(),
  remark: yup.string(),
});

const contactFormMergedSchema: yup.ObjectSchema<ReservationFormData> = merge(
  personalDataSchema,
  contactDataSchema,
  captchaTokenSchema,
  reservationFormSchema,
) as yup.ObjectSchema<ReservationFormData>;

const options = [
  { label: "Facebook", value: "facebook" },
  { label: "Bouche à oreille", value: "hear" },
  { label: "Affiche", value: "display" },
  { label: "Autre", value: "other" },
];

export default function ReservationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<ReservationFormData>({
    resolver: yupResolver(contactFormMergedSchema),
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  useEffect(() => {
    register("token", { required: true });
  }, [register]);

  const onSubmit = (data: ReservationFormData) => {
    try {
      console.log(data);
      // sendContactEmail(data);
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
        {...register("mail")}
        errorMessage={errors?.mail?.message?.toString()}
      >
        Email*
      </FormInput>
      <FormInput
        {...register("phone")}
        errorMessage={errors?.phone?.message?.toString()}
      >
        Téléphone
      </FormInput>
      <FormRow>
        <FormInput
          {...register("personCount")}
          errorMessage={errors?.personCount?.message?.toString()}
          type="number"
          width="small"
        >
          Nombre de personnes*
        </FormInput>
      </FormRow>
      <FormRow>
        <FormCheckbox
          {...register("takeMeal")}
          errorMessage={errors?.takeMeal?.message?.toString()}
        >
          Repas sur place
        </FormCheckbox>
      </FormRow>
      <FormRow>
        <FormTextArea
          {...register("remark")}
          errorMessage={errors?.remark?.message?.toString()}
        >
          Remarque
        </FormTextArea>
      </FormRow>
      <FormRow>
        <Controller
          name="howDidYouHearAboutUs"
          control={control}
          render={({ field }) => (
            <FormSelect
              options={options}
              inputSize="medium"
              errorMessage={errors?.howDidYouHearAboutUs?.message?.toString()}
              {...field}
            >
              {" "}
              Comment avez-vous connu l&apos;évènement ?{" "}
            </FormSelect>
          )}
        />{" "}
      </FormRow>{" "}
      <FormRow>
        {" "}
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
