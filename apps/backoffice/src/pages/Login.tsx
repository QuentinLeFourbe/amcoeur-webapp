import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../components/atoms/Form/Form";
import FormInput from "../components/molecules/Form/FormInput";
import { LoginInfo } from "../types/login";
import { loginInfoSchema } from "../schemas/login";
import FormRow from "../components/atoms/Form/FormRow";

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow centerContent>
        <FormInput
          register={register("username")}
          errorMessage={errors?.username?.message?.toString()}
          width="medium"
        >
          Nom d&apos;utilisateur
        </FormInput>
      </FormRow>
      <FormRow centerContent>
        <FormInput
          register={register("password")}
          errorMessage={errors?.password?.message?.toString()}
          width="medium"
        >
          Mot de passe
        </FormInput>
      </FormRow>
    </Form>
  );
}

export default Login;
