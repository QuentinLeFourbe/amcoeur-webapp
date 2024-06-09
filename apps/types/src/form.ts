import mongoose from "mongoose";
import { z } from "zod";

export const FieldTypeSchema = z.enum([
  "NUMERIC",
  "SHORT_TEXT",
  "TEXT_AREA",
  "MULTIPLE_CHOICES",
  "UNIQUE_CHOICE",
  "EMAIL",
  "PHONE",
  "GENDER",
]);

export const FieldSchema = z.object({
  id: z.string(),
  content: z.string(),
  type: FieldTypeSchema,
  isRequired: z.boolean().optional(),
  choices: z.string().array().optional(),
});

const formBaseSchema = z.object({
  name: z.string(),
});

export const FormClientDataSchema = z
  .object({
    _id: z.string().optional(),
    fields: z.array(FieldSchema),
  })
  .merge(formBaseSchema);

export const FormServerDataSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
    fields: z.array(FieldSchema),
  })
  .merge(formBaseSchema);

export const FormSummarySchema = formBaseSchema
  .merge(FormClientDataSchema.pick({ _id: true }))
  .merge(z.object({ answerCount: z.number() }));

export type FormServerData = z.infer<typeof FormServerDataSchema>;
export type FormClientData = z.infer<typeof FormClientDataSchema>;
export type FormField = z.infer<typeof FieldSchema>;
export type FormFieldType = z.infer<typeof FieldTypeSchema>;
export type FormSummary = z.infer<typeof FormSummarySchema>;
