import mongoose from "mongoose";
import { z } from "zod";

export const fieldTypeSchema = z.enum([
  "NUMERIC",
  "SHORT_TEXT",
  "TEXT_AREA",
  "MULTIPLE_CHOICES",
  "UNIQUE_CHOICE",
  "EMAIL",
  "PHONE",
  "GENDER",
  "DISPLAY_TEXT",
]);

export const fieldSchema = z.object({
  id: z.string(),
  content: z.string(),
  type: fieldTypeSchema,
  isRequired: z.boolean().optional(),
  choices: z.string().array().optional(),
});

const formBaseSchema = z.object({
  name: z.string(),
});

export const formClientDataSchema = z
  .object({
    _id: z.string().optional(),
    fields: z.array(fieldSchema),
  })
  .merge(formBaseSchema);

export const formServerDataSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
    fields: z.array(fieldSchema),
  })
  .merge(formBaseSchema);

export const formSummarySchema = formBaseSchema
  .merge(formClientDataSchema.pick({ _id: true }))
  .merge(z.object({ answerCount: z.number() }));

export type FormServerData = z.infer<typeof formServerDataSchema>;
export type FormClientData = z.infer<typeof formClientDataSchema>;
export type FormField = z.infer<typeof fieldSchema>;
export type FormFieldType = z.infer<typeof fieldTypeSchema>;
export type FormSummary = z.infer<typeof formSummarySchema>;
