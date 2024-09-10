import mongoose from "mongoose";
import { z } from "zod";

const speciesSchema = z.enum(["CAT", "DOG", "HORSE"]);

const adoptionBaseSchema = z.object({
  name: z.string(),
  species: speciesSchema,
  race: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  visible: z.boolean(),
  archived: z.boolean(),
  commentary: z.string().optional(),
});

export const AdoptionClientDataSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(adoptionBaseSchema);

export const AdoptionServerDataSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(adoptionBaseSchema);

export type AdoptionClient = z.infer<typeof AdoptionClientDataSchema>;
export type AdoptionServer = z.infer<typeof AdoptionServerDataSchema>;
