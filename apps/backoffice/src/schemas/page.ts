import * as yup from "yup";
import { PageData } from "@amcoeur/types";

export const pageDataSchema: yup.ObjectSchema<PageData> = yup.object().shape({
  name: yup.string().required("Veuiilez renseigner le nom de la page"),
  route: yup
    .string()
    .required("Veuiilez renseigner le chemin d'accès de la page"),
  components: yup.array().required("Veuillez ajouter des composants à la page"),
  id: yup.number(),
});
