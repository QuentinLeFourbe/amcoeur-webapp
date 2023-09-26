import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";

interface IFormData {
  Nom: string;
  Prénom: string;
  Email: string;
  Téléphone: string;
  Message: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const onSubmit = (data: IFormData) => console.log(data);
  console.log(errors);

  return (
    <div>
      <form className={formContainer} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={formInput}
          type="text"
          placeholder="Nom"
          {...register("Nom", { required: true })}
        />
        <input
          className={formInput}
          type="text"
          placeholder="Prénom"
          {...register("Prénom", { required: true })}
        />
        <input
          className={formInput}
          type="text"
          placeholder="Email"
          {...register("Email", { required: true })}
        />
        <input
          className={formInput}
          type="tel"
          placeholder="Téléphone"
          {...register("Téléphone", { required: true })}
        />
        <textarea
          className={formInput}
          placeholder="Message"
          {...register("Message", { required: true })}
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
