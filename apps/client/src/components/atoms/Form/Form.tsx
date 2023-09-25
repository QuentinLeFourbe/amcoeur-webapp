import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
        <input
          className={formInput}
          type="text"
          placeholder="Message"
          {...register}
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
  justifyContent: "center",
});
const formInput = css({
  width: "50%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "20px",
  textAlign: "center",
});
