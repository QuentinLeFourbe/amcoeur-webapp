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
        <div className={totorow}>
          <div className={totocol}>
            <FormLabel>Nom</FormLabel>
            <FormInput type="text" {...register("name", { required: true })} />
          </div>
          <div className={totocol}>
            <FormLabel>Prénom</FormLabel>
            <FormInput
              type="text"
              {...register("firstname", { required: true })}
            />
          </div>
        </div>
        <div className={totorow}>
          <div className={totocol}>
            <FormLabel>Email</FormLabel>
            <FormInput type="text" {...register("mail", { required: true })} />
          </div>
          <div className={totocol}>
            <FormLabel>Téléphone</FormLabel>
            <FormInput type="tel" {...register("phone")} />
          </div>
        </div>

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
  flexFlow: "column wrap",
  gap: "10px",
  alignItems: "center",
});
const formInput = css({
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "20px",
  textAlign: "center",
});
const totorow = css({
  display: "flex",
  flexFlow: "row nowrap",
  gap: "10px",
  alignItems: "center",
});
const totocol = css({
  display: "flex",
  flexFlow: "column wrap",
  gap: "20px",
  alignItems: "center",
});
