import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../components/atoms/Form/Form";
import FormInput from "../components/molecules/Form/FormInput";
import { LoginInfo } from "../types/login";
import { loginInfoSchema } from "../schemas/login";
import { css } from "../../styled-system/css";
import Button from "../components/atoms/Button/Button";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInfo>({
    resolver: yupResolver(loginInfoSchema),
  });

  const onSubmit = (data: LoginInfo) => {
    try {
      // Do something
      axios.post("http://localhost:3000/api/users/login", data);
    } catch (e) {
      console.error(e);
      return;
    } finally {
      reset();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={container}>
      <FormInput
        register={register("username")}
        errorMessage={errors?.username?.message?.toString()}
        width="medium"
      >
        Nom d&apos;utilisateur
      </FormInput>
      <FormInput
        register={register("password")}
        errorMessage={errors?.password?.message?.toString()}
        width="medium"
      >
        Mot de passe
      </FormInput>
      <Button type="submit">Se connecter</Button>
    </Form>
  );
}

export default Login;

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});
