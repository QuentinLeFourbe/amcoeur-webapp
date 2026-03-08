import { z } from "zod";
import { adoptionBaseSchema, adoptionPrivateSchema } from "../adoption.js";

/**
 * Schéma pour la création d'une adoption.
 * Réutilise les briques de base de l'entité Adoption mais omet les champs système (id, dates).
 */
export const createAdoptionSchema = adoptionBaseSchema.merge(adoptionPrivateSchema);

export type CreateAdoptionDto = z.infer<typeof createAdoptionSchema>;
