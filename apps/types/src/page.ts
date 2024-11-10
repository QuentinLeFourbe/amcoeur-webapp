import mongoose from "mongoose";
import { z } from "zod";

export const basePageComponentSchema = z.object({
  id: z.string().optional(),
});

export const pageComponentWithImageSchema = z
  .object({
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
  })
  .merge(basePageComponentSchema);

export const emptyComponentSchema = z
  .object({ type: z.literal("Empty") })
  .merge(basePageComponentSchema);

export const imageComponentSchema = z
  .object({
    type: z.literal("Image"),
    caption: z.string().optional(),
  })
  .merge(pageComponentWithImageSchema);

export const titleBannerComponentSchema = z
  .object({
    type: z.literal("TitleBanner"),
    title: z.string().optional(),
    content: z.string().optional(),
  })
  .merge(pageComponentWithImageSchema);

export const contentPanelComponentSchema = z
  .object({
    type: z.literal("ContentPanel"),
    title: z.string().optional(),
    content: z.string().optional(),
    link: z.string().optional(),
    linkLabel: z.string().optional(),
  })
  .merge(pageComponentWithImageSchema);

export const textAreaComponentSchema = z
  .object({
    type: z.literal("TextArea"),
    content: z.string().optional(),
  })
  .merge(basePageComponentSchema);

export const formComponentSchema = z
  .object({
    type: z.literal("Form"),
    formId: z.string().optional(),
  })
  .merge(basePageComponentSchema);

export const pageComponentSchema = z.union([
  titleBannerComponentSchema,
  contentPanelComponentSchema,
  textAreaComponentSchema,
  imageComponentSchema,
  emptyComponentSchema,
  formComponentSchema,
]);

export const pageDataSchema = z.object({
  name: z.string(),
  route: z.string().regex(/^[a-z0-9-]+$/, {
    message:
      "Le chemin d'accès ne doit contenir que des lettres minuscules, chiffres ou tirets.",
  }),
  components: z.array(pageComponentSchema),
});

export const pageDataClientSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(pageDataSchema);

export const pageDataServerSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(pageDataSchema);

// General types
export type PageComponent = z.infer<typeof pageComponentSchema>;
export type PageComponentWithImage = z.infer<
  typeof pageComponentWithImageSchema
>;

// Components types
export type EmptyComponent = z.infer<typeof emptyComponentSchema>;
export type ImageComponent = z.infer<typeof imageComponentSchema>;
export type TitleBannerComponent = z.infer<typeof titleBannerComponentSchema>;
export type ContentPanelComponent = z.infer<typeof contentPanelComponentSchema>;
export type TextAreaComponent = z.infer<typeof textAreaComponentSchema>;
export type FormComponent = z.infer<typeof formComponentSchema>;
export type PageComponentType = PageComponent["type"];

export type PageDataClient = z.infer<typeof pageDataClientSchema>;
export type PageDataServer = z.infer<typeof pageDataServerSchema>;
