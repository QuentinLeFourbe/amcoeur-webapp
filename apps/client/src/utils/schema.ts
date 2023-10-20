import * as yup from "yup";

/**
 * Fusionne plusieurs schémas Yup en un seul.
 * @param schemas Les schémas Yup à fusionner.
 * @returns Le schéma fusionné.
 */
export const merge = (...schemas: yup.AnySchema[]) => {
  if (schemas.length < 2) {
    throw new Error(
      "Au moins deux schémas doivent être fournis pour la fusion."
    );
  }

  let mergedSchema = schemas[0];

  for (let i = 1; i < schemas.length; i++) {
    mergedSchema = mergedSchema.concat(schemas[i]);
  }

  return mergedSchema;
};
