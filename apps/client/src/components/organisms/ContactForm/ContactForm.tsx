import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { ContactData } from "../../../types/email";
import { sendContactEmail } from "../../../api/emails";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormLabel from "../../atoms/Form/FormLabel";
import FormInput from "../../atoms/Form/FormInput";
import FormTextArea from "../../atoms/Form/FormTextArea";
import Form from "../../atoms/Form/Form";
import FormErrorLabel from "../../atoms/Form/FormErrorLabel";
import Button from "../../atoms/Button/Button";

const schema = yup
  .object({
    name: yup.string().required("Nom est requis"),
    firstname: yup.string().required("Prénom est requis"),
    mail: yup
      .string()
      .required("Email est caca requis")
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
  })
  .required();

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ContactData) => {
    sendContactEmail(data);
  };

  return (
    <div>
      <Form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={formRow}>
          <div className={formCol}>
            <FormLabel>Nom*</FormLabel>
            <FormInput {...register("name")} />
            {errors.name && (
              <FormErrorLabel>{errors.name.message}</FormErrorLabel>
            )}
          </div>
          <div className={formCol}>
            <FormLabel>Prénom*</FormLabel>
            <FormInput {...register("firstname")} />{" "}
            {errors.firstname && (
              <FormErrorLabel>{errors.firstname.message}</FormErrorLabel>
            )}
          </div>
        </div>
        <div className={formRow}>
          <div className={formCol}>
            <FormLabel>Email*</FormLabel>
            <FormInput {...register("mail")} />
            {errors.mail && (
              <FormErrorLabel>{errors.mail.message}</FormErrorLabel>
            )}
          </div>
          <div className={formCol}>
            <FormLabel>Téléphone</FormLabel>
            <FormInput {...register("phone")} />
            {errors.phone && (
              <FormErrorLabel>{errors.phone.message}</FormErrorLabel>
            )}
          </div>
        </div>
        <FormLabel>Message</FormLabel>
        <FormTextArea {...register("message")} />
        {errors.message && (
          <FormErrorLabel>{errors.message.message}</FormErrorLabel>
        )}

        <Button type="submit">Envoyer</Button>
      </Form>
    </div>
  );
}
const formContainer = css({
  display: "flex",
  justifyContent: "center",
  flexFlow: "column wrap",
  gap: "10px",
  alignItems: "center",
});

const formRow = css({
  display: "flex",
  justifyContent: "center",
  flexFlow: "row nowrap",
  gap: "20px",
  alignItems: "flex-start",
  width: "70%",
  marginTop: "10px",
});
const formCol = css({
  display: "flex",
  flexFlow: "column wrap",
  gap: "10px",
  textAlign: "left",
  width: "40%",
});
