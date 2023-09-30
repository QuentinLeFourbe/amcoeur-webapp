import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { ContactData } from "../../../types/email";
import { sendContactEmail } from "../../../api/emails";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>();

  const onSubmit = (data: ContactData) => {
    console.log("ONSUBMIT", { data });
    sendContactEmail(data).then((res) => console.log(res));
  };
  return (
    <div>
      <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={formInput}
          type="text"
          placeholder="Nom"
          {...register("name", { required: true })}
        />
        <input
          className={formInput}
          type="text"
          placeholder="Prénom"
          {...register("firstname", { required: true })}
        />
        <input
          className={formInput}
          type="text"
          placeholder="Email"
          {...register("mail", { required: true })}
        />
        <input
          className={formInput}
          type="tel"
          placeholder="Téléphone"
          {...register("phone")}
        />
        <textarea
          className={formInput}
          placeholder="Message"
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
