import { z } from "zod";

export enum EmailBlockType {
  TITLE = "TITLE",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
}

export enum ImageAspectRatio {
  SQUARE = "1/1",
  PORTRAIT = "4/5",
  LANDSCAPE = "16/9",
  AUTO = "auto",
}

// Bloc Titre
export const emailTitleBlockSchema = z.object({
  type: z.literal(EmailBlockType.TITLE),
  content: z.string().min(1, "Le titre est obligatoire"),
});

// Bloc Texte (Markdown)
export const emailTextBlockSchema = z.object({
  type: z.literal(EmailBlockType.TEXT),
  content: z.string().min(1, "Le contenu est obligatoire"),
});

// Bloc Image (1 à 3 images)
export const emailImageBlockSchema = z.object({
  type: z.literal(EmailBlockType.IMAGE),
  images: z.array(z.object({
    url: z.string().optional(),
    file: z.instanceof(File).optional(),
    aspectRatio: z.nativeEnum(ImageAspectRatio).default(ImageAspectRatio.AUTO),
    maxHeight: z.number().optional().default(300),
    caption: z.string().optional(), // Nouveau : Légende de l'image
  })).min(1, "Au moins une image est requise").max(3, "Maximum 3 images par bloc"),
});

// Union des blocs
export const emailBlockSchema = z.discriminatedUnion("type", [
  emailTitleBlockSchema,
  emailTextBlockSchema,
  emailImageBlockSchema,
]);

// DTO de la Campagne
export const emailCampaignSchema = z.object({
  subject: z.string().min(1, "L'objet du mail est obligatoire"),
  targetEmail: z.string().email().optional(),
  blocks: z.array(emailBlockSchema).min(1, "Le mail doit contenir au moins un bloc"),
});

export type EmailBlock = z.infer<typeof emailBlockSchema>;
export type EmailTitleBlock = z.infer<typeof emailTitleBlockSchema>;
export type EmailTextBlock = z.infer<typeof emailTextBlockSchema>;
export type EmailImageBlock = z.infer<typeof emailImageBlockSchema>;
export type EmailCampaignDto = z.infer<typeof emailCampaignSchema>;
