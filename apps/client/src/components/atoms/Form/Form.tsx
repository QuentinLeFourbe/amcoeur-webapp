import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { ContactData } from "../../../types/email";
import { sendContactEmail } from "../../../api/emails";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import FormTextArea from "./FormTextArea";

export default function Form() {
  const { register, handleSubmit } = useForm<ContactData>();

  const onSubmit = (data: ContactData) => {
    console.log("ONSUBMIT", { data });
    sendContactEmail(data).then((res) => console.log(res));
  };

  return (
    <div>
      <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={formRow}>
          <div className={formCol}>
            <FormLabel>Nom*</FormLabel>
            <FormInput type="text" {...register("name", { required: true })} />
          </div>
          <div className={formCol}>
            <FormLabel>Prénom*</FormLabel>
            <FormInput
              type="text"
              {...register("firstname", { required: true })}
            />
          </div>
        </div>
        <div className={formRow}>
          <div className={formCol}>
            <FormLabel>Email*</FormLabel>
            <FormInput type="text" {...register("mail", { required: true })} />
          </div>
          <div className={formCol}>
            <FormLabel>Téléphone</FormLabel>
            <FormInput type="tel" {...register("phone")} />
          </div>
        </div>

        <FormTextArea {...register("message", { required: true })} />
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
  gap: "10px",
  alignItems: "center",
  width: "100%",
});
const formCol = css({
  display: "flex",
  justifyContent: "center",
  flexFlow: "column wrap",
  gap: "20px",
  alignItems: "center",
});
const submitButtonStyle = css({
  fontSize: "20px",
  backgroundColor: "buttons.primary.background",
  borderRadius: "4px",
  padding: "10px",
  width: "10%",
  margin: "10px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "buttons.primary.backgroundHover",
  },
});
