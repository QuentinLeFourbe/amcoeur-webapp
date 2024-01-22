import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Form from "../components/atoms/Form/Form";
import FormInput from "../components/molecules/Form/FormInput";
import { LoginInfo } from "../types/login";
import { loginInfoSchema } from "../schemas/login";
import { css } from "../../styled-system/css";
import Button from "../components/atoms/Button/Button";
import useUser from "../hooks/useUser";
import { login } from "../api/users";
import { useState } from "react";
import { AxiosError } from "axios";
import ErrorLabel from "../components/atoms/ErrorLabel/ErrorLabel";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInfo>({
    resolver: yupResolver(loginInfoSchema),
  });
  const [error, setError] = useState<string | null>(null); // [1
  const { user, loginUser } = useUser();
  const navigate = useNavigate();
  if (user) {
    navigate("/");
  }

  const onSubmit = async (data: LoginInfo) => {
    try {
      const user = await login(data);
      loginUser(user.data);
      navigate("/");
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 401) {
        setError("Votre compte est bloqué, veuillez réessayer plus tard");
      }
      if (error?.response?.status === 400) {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      }
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
        type="password"
      >
        Mot de passe
      </FormInput>
      <Button type="submit">Se connecter</Button>
      <ErrorLabel>{error}</ErrorLabel>
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
