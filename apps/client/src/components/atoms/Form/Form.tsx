import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { ContactData } from "../../../types/email";
import { sendContactEmail } from "../../../api/emails";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import FormTextArea from "./FormTextArea";

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
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ContactData) => {
    console.log("ONSUBMIT", { data });
    sendContactEmail(data).then((res) => console.log(res));
  };
  console.log(errors, "ceci est les erreurs");
  return (
    <div>
      <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={formRow}>
          <div className={formCol}>
            <FormLabel>Nom*</FormLabel>
            <FormInput {...register("name")} />
            {errors.name && <p className={errorForm}>{errors.name.message}</p>}
          </div>{" "}
          <div className={formCol}>
            <FormLabel>Prénom*</FormLabel>
            <FormInput {...register("firstname")} />{" "}
            {errors.firstname && (
              <p className={errorForm}>{errors.firstname.message}</p>
            )}
          </div>
        </div>
        <div className={formRow}>
          <div className={formCol}>
            <FormLabel>Email*</FormLabel>
            <FormInput {...register("mail")} />
            {errors.mail && <p className={errorForm}>{errors.mail.message}</p>}
          </div>
          <div className={formCol}>
            <FormLabel>Téléphone</FormLabel>
            <FormInput {...register("phone")} />
            {errors.phone && (
              <p className={errorForm}>{errors.phone.message}</p>
            )}
          </div>
        </div>
        <FormLabel>Message</FormLabel>
        <FormTextArea {...register("message")} />
        {errors.message && (
          <p className={errorForm}>{errors.message.message}</p>
        )}

        <button className={submitButtonStyle} type="submit">
          Envoyer
        </button>
      </form>
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
const submitButtonStyle = css({
  fontSize: "20px",
  cursor: "pointer",
  backgroundColor: "buttons.primary.background",
  borderRadius: "4px",
  padding: "10px",
  width: "10%",
  margin: "10px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "buttons.primary.backgroundHover",
  },
  "&:active": {
    backgroundColor: "buttons.primary.backgroundActive",
  },
});
const errorForm = css({
  color: "red",
});
