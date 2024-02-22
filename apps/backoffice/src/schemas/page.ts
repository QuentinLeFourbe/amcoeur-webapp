import * as yup from "yup";
import { PageData } from "@amcoeur/types";
import { Types } from "mongoose";

export const pageDataSchema: yup.ObjectSchema<PageData> = yup.object().shape({
  name: yup.string().required("Veuillez renseigner le nom de la page"),
  route: yup
    .string()
    .lowercase()
    .matches(
      /^[a-z0-9-]+$/,
      "Le chemin d'accès ne doit contenir que des lettres minuscules, chiffres ou tirets.",
    )
    .required("Veuiilez renseigner le chemin d'accès de la page"),
  components: yup
    .array()
    .of(
      yup.object().shape({
        image: yup
          .mixed()
          .test(
            "fileType",
            "Seuls les fichiers WEBP, PNG ou JPG sont autorisés",
            (value) => {
              const fileValue = value as File;
              if (!value) return true;
              return (
                fileValue &&
                ["image/webp", "image/png", "image/jpeg"].includes(
                  fileValue.type,
                )
              );
            },
          )
          .test(
            "fileSize",
            "La taille du fichier ne doit pas dépasser 2 Mo",
            (value) => {
              if (!value) return true;
              const fileValue = value as File;
              return fileValue.size <= 2 * 1024 * 1024; // 2 Mo
            },
          ),
      }),
    )
    .required("Veuillez ajouter des composants à la page"),
  _id: yup.mixed<Types.ObjectId>(),
});
