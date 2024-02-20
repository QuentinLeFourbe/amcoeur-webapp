import * as yup from "yup";
import { PageData } from "@amcoeur/types";
import { Types } from "mongoose";

export const pageDataSchema: yup.ObjectSchema<PageData> = yup.object().shape({
  name: yup.string().required("Veuillez renseigner le nom de la page"),
  route: yup
    .string().lowercase().matches(/^[a-z0-9-]+$/, "Le chemin d'accès ne doit contenir que des lettres minuscules, chiffres ou tirets.")
    .required("Veuiilez renseigner le chemin d'accès de la page"),
  components: yup.array().required("Veuillez ajouter des composants à la page"),
  _id: yup.mixed<Types.ObjectId>(),
});
