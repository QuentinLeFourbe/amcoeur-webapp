import { UnsubscribeFormData, unsubscribeSchema } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";

import { css } from "../../../styled-system/css";
import { unsubscribeEmail } from "../api/emails";
import Button from "../components/atoms/Button/Button";
import Captcha from "../components/atoms/Captcha/Captcha";
import Form from "../components/atoms/Form/Form";
import FormRow from "../components/atoms/Form/FormRow";
import FormInput from "../components/molecules/Form/FormInput";

function Unsubscribe() {
  const {
    register,

    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<UnsubscribeFormData>({
    resolver: zodResolver(unsubscribeSchema),
  });
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  useEffect(() => {
    register("token", { required: true });
  }, [register]);

  const onSubmit = async (data: UnsubscribeFormData) => {
    try {
      await unsubscribeEmail(data);
      reset();
      setDisplayConfirmation(true);
      recaptchaRef?.current?.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDir: "column",
        alignItems: "center",
        margin: "10vh 1rem 1rem 1rem",
        gap: "16px",
      })}
    >
      <h1
        className={css({
          fontSize: "2xl",
        })}
      >
        Entrez votre email pour vous désinscrire de notre liste de diffusion
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <FormInput
            {...register("email")}
            errorMessage={errors?.email?.message?.toString()}
            placeholder="Email"
          >
            {""}
          </FormInput>
        </FormRow>

        <FormRow>
          <Captcha
            ref={recaptchaRef}
            setFormValue={(value: string): void => setValue("token", value)}
            errorMessage={errors?.token?.message?.toString()}
          />
        </FormRow>

        <Button>Me désinscrire</Button>
      </Form>
      {displayConfirmation && (
        <FormRow>
          <p>Votre désinscription a bien été prise en compte</p>
        </FormRow>
      )}
    </div>
  );
}

export default Unsubscribe;
