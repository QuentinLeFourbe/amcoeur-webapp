import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../components/atoms/Form/Form";
import FormInput from "../components/molecules/Form/FormInput";
import { LoginInfo } from "../types/login";
import { loginInfoSchema } from "../schemas/login";
import FormRow from "../components/atoms/Form/FormRow";
import { css } from "../../styled-system/css";

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
