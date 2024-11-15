import mongoose from "mongoose";
import { z } from "zod";

const speciesSchema = z.enum(["CAT", "DOG", "HORSE"]);
const genderSchema = z.enum(["MALE", "FEMALE"]);

const adoptionBaseSchema = z.object({
  name: z.string(),
  species: speciesSchema,
  race: z.string().optional(),
  gender: genderSchema,
  birthday: z.date().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

const adoptionPrivateSchema = z.object({
  visible: z.boolean(),
  archived: z.boolean(),
  commentary: z.string().optional(),
});

export const adoptionClientPublicDataSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(adoptionBaseSchema);

export const adoptionClientDataSchema = adoptionClientPublicDataSchema.merge(
  adoptionPrivateSchema,
);

export const adoptionServerPublicDataSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(adoptionBaseSchema);

export const adoptionServerDataSchema = adoptionServerPublicDataSchema.merge(
  adoptionPrivateSchema,
);

export type AdoptionClientData = z.infer<typeof adoptionClientDataSchema>;
export type AdoptionClientPublicData = z.infer<
  typeof adoptionClientPublicDataSchema
>;

export type AdoptionServerData = z.infer<typeof adoptionServerDataSchema>;
export type AdoptionServerPublicData = z.infer<
  typeof adoptionServerPublicDataSchema
>;

export type AdoptionGender = z.infer<typeof genderSchema>;
export type AdoptionSpecies = z.infer<typeof speciesSchema>;
