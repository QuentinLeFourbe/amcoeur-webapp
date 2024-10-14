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

export const AdoptionClientPublicDataSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(adoptionBaseSchema);

export const AdoptionClientDataSchema = AdoptionClientPublicDataSchema.merge(
  adoptionPrivateSchema,
);

export const AdoptionServerPublicDataSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(adoptionBaseSchema);

export const AdoptionServerDataSchema = AdoptionServerPublicDataSchema.merge(
  adoptionPrivateSchema,
);

export type AdoptionClientPublicData = z.infer<
  typeof AdoptionClientPublicDataSchema
>;
export type AdoptionClientData = z.infer<typeof AdoptionClientDataSchema>;
export type AdoptionServerPublicData = z.infer<
  typeof AdoptionServerPublicDataSchema
>;
export type AdoptionServerData = z.infer<typeof AdoptionServerDataSchema>;
export type AdoptionGender = z.infer<typeof genderSchema>;
export type AdoptionSpecies = z.infer<typeof speciesSchema>;

type AdoptionsListServerBaseResponse = {
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };
  count?: {
    species?: { _id: AdoptionSpecies; count: number }[];
    gender?: { _id: AdoptionGender; count: number }[];
  };
};

export type AdoptionsListPublicData = AdoptionsListServerBaseResponse & {
  data: AdoptionServerPublicData[];
};

export type AdoptionsListData = AdoptionsListServerBaseResponse & {
  data: AdoptionServerData[];
};

export type AdoptionsListClientData = AdoptionsListServerBaseResponse & {
  data: AdoptionClientData[];
};

export type AdoptionsListClientPublicData = AdoptionsListServerBaseResponse & {
  data: AdoptionClientPublicData[];
};
