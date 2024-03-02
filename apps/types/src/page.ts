import mongoose from "mongoose";
import { z } from "zod";

export const PageComponentWithImageSchema = z.object({
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

export const TitleBannerComponentSchema = z
  .object({
    type: z.literal("TitleBanner"),
    title: z.string().optional(),
    content: z.string().optional(),
  })
  .merge(PageComponentWithImageSchema);

export const ContentPanelComponentSchema = z
  .object({
    type: z.literal("ContentPanel"),
    title: z.string().optional(),
    content: z.string().optional(),
    link: z.string().optional(),
    linkLabel: z.string().optional(),
  })
  .merge(PageComponentWithImageSchema);

export const TextAreaComponentSchema = z.object({
  type: z.literal("TextArea"),
  content: z.string().optional(),
});

export const PageComponentSchema = z.union([
  TitleBannerComponentSchema,
  ContentPanelComponentSchema,
  TextAreaComponentSchema,
]);

export const PageDataSchema = z.object({
  name: z.string(),
  route: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Le chemin d'accès ne doit contenir que des lettres minuscules, chiffres ou tirets.",
    }),
  components: z.array(PageComponentSchema),
});

export const PageDataClientSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(PageDataSchema);

export const PageDataServerSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(PageDataSchema);

export type TitleBannerComponent = z.infer<typeof TitleBannerComponentSchema>;
export type ContentPanelComponent = z.infer<typeof ContentPanelComponentSchema>;
export type PageComponentWithImage = z.infer<
  typeof PageComponentWithImageSchema
>;
export type TextAreaComponent = z.infer<typeof TextAreaComponentSchema>;
export type PageComponent = z.infer<typeof PageComponentSchema>;
export type PageDataClient = z.infer<typeof PageDataClientSchema>;
export type PageDataServer = z.infer<typeof PageDataServerSchema>;
