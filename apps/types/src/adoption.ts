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

export type AdoptionClientPublicData = z.infer<
  typeof adoptionClientPublicDataSchema
>;
export type AdoptionClientData = z.infer<typeof adoptionClientDataSchema>;
export type AdoptionServerPublicData = z.infer<
  typeof adoptionServerPublicDataSchema
>;
export type AdoptionServerData = z.infer<typeof adoptionServerDataSchema>;
export type AdoptionGender = z.infer<typeof genderSchema>;
export type AdoptionSpecies = z.infer<typeof speciesSchema>;

export type AdoptionsListCount = {
  species?: { _id: AdoptionSpecies; count: number }[];
  gender?: { _id: AdoptionGender; count: number }[];
};

export type AdoptionListPagination = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
};

type AdoptionsListServerBaseResponse = {
  pagination: AdoptionListPagination;
  count?: AdoptionsListCount;
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
