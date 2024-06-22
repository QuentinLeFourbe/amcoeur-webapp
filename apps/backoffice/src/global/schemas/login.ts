import * as yup from "yup";
import { LoginInfo } from "../types/login";

export const loginInfoSchema: yup.ObjectSchema<LoginInfo> = yup.object().shape({
  username: yup
    .string()
    .required("Veuiilez renseigner votre nom d'utilisateur"),
  password: yup.string().required("Veuiilez renseigner votre mot de passe"),
});
