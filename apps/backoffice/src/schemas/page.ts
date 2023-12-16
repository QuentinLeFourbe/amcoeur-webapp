import * as yup from "yup";
import { PageData } from "@amcoeur/types";

export const pageDataSchema: yup.ObjectSchema<PageData> = yup.object().shape({
  name: yup.string().required("Veuiilez renseigner le nom de la page"),
  route: yup
    .string()
    .required("Veuiilez renseigner le chemin d'accès de la page"),
  content: yup.string().required("Veuiilez renseigner le contenu de la page"),
  id: yup.number(),
});
