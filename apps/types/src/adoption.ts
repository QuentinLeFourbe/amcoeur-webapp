import mongoose from "mongoose";
import { z } from "zod";

const speciesSchema = z.enum(["CAT", "DOG", "HORSE", "OTHER"]);
const genderSchema = z.enum(["MALE", "FEMALE"]);
const sortBySchema = z.enum([
  "name",
  "species",
  "race",
  "gender",
  "birthday",
  "emergency",
  "visible",
  "adopted",
  "createdAt",
  "updatedAt",
]);

const adoptionBaseSchema = z.object({
  name: z.string(),
  species: speciesSchema,
  race: z.string().optional(),
  gender: genderSchema,
  birthday: z.date().optional(),
  description: z.string().optional(),
  emergency: z.boolean(),
  imageUrl: z.string().optional(),
  image: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine(
      (image) => {
        if (!image) return true;

        return (
          image &&
          ["image/webp", "image/png", "image/jpeg"].includes(image.type)
        );
      },
      { message: "Seuls les fichiers WEBP, PNG ou JPG sont autorisés" },
    )
    .refine(
      (image) => {
        if (!image) return true;
        return image.size <= 2 * 1024 * 1024;
      },
      { message: "La taille du fichier ne doit pas dépasser 2 Mo" },
    ),
});

const adoptionPrivateSchema = z.object({
  visible: z.boolean(),
  adopted: z.boolean(),
  commentary: z.string().optional(),
});

export const adoptionClientPublicDataSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(adoptionBaseSchema);

export const adoptionClientDataSchema = z
  .object({
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .merge(adoptionClientPublicDataSchema)
  .merge(adoptionPrivateSchema);

export const adoptionServerPublicDataSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(adoptionBaseSchema);

export const adoptionServerDataSchema = z
  .object({
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .merge(adoptionServerPublicDataSchema)
  .merge(adoptionPrivateSchema);

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
export type AdoptionSortBy = z.infer<typeof sortBySchema>;

export type AdoptionCount = {
  species?: { key: "CAT" | "DOG" | "HORSE" | "OTHER"; value: number }[];
  gender?: { key: "MALE" | "FEMALE"; value: number }[];
};

export type AdoptionFilter = {
  species?: AdoptionSpecies[];
  gender?: AdoptionGender;
  name?: string;
  adopted?: boolean;
  visible?: boolean;
  emergency?: boolean;
};
