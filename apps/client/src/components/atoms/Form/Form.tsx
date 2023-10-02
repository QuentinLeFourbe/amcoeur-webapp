import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { ContactData } from "../../../types/email";
import { sendContactEmail } from "../../../api/emails";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";

export default function Form() {
  const { register, handleSubmit } = useForm<ContactData>();

  const onSubmit = (data: ContactData) => {
    console.log("ONSUBMIT", { data });
    sendContactEmail(data).then((res) => console.log(res));
  };

  return (
    <div>
      <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Nom</FormLabel>
        <FormInput
          className={formInput}
          type="text"
          {...register("name", { required: true })}
        />
        <FormLabel>Prénom</FormLabel>
        <FormInput
          className={formInput}
          type="text"
          {...register("firstname", { required: true })}
        />
        <FormLabel>Email</FormLabel>
        <FormInput
          className={formInput}
          type="text"
          {...register("mail", { required: true })}
        />
        <FormLabel>Téléphone</FormLabel>
        <FormInput className={formInput} type="tel" {...register("phone")} />
        <textarea
          className={formInput}
          {...register("message", { required: true })}
          rows={5}
        />
        <input className={formInput} type="submit" />
      </form>
    </div>
  );
}
const formContainer = css({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "10px",
  alignItems: "center",
});
const formInput = css({
  width: "30%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "20px",
  textAlign: "center",
});
