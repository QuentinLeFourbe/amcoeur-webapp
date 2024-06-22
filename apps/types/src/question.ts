import type mongoose from "mongoose";
import { z } from "zod";

export const QuestionTypeSchema = z.enum([
  "NUMERIC",
  "SHORT_TEXT",
  "TEXT_AREA",
  "MULTIPLE_CHOICES",
  "UNIQUE_CHOICE",
  "EMAIL",
  "PHONE",
  "GENDER",
]);

export const QuestionSchema = z.object({
  name: z.string(),
  content: z.string(),
  type: QuestionTypeSchema,
});

export const QuestionClientDataSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(QuestionSchema);

export const QuestionServerDataSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(QuestionSchema);

export type QuestionType = z.infer<typeof QuestionTypeSchema>;
export type QuestionClientData = z.infer<typeof QuestionClientDataSchema>;
export type QuestionServerData = z.infer<typeof QuestionServerDataSchema>;
