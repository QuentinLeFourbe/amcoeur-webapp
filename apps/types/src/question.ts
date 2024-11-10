import type mongoose from "mongoose";
import { z } from "zod";

export const questionTypeSchema = z.enum([
  "NUMERIC",
  "SHORT_TEXT",
  "TEXT_AREA",
  "MULTIPLE_CHOICES",
  "UNIQUE_CHOICE",
  "EMAIL",
  "PHONE",
  "GENDER",
]);

export const questionSchema = z.object({
  name: z.string(),
  content: z.string(),
  type: questionTypeSchema,
});

export const questionClientDataSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(questionSchema);

export const questionServerDataSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(questionSchema);

export type QuestionType = z.infer<typeof questionTypeSchema>;
export type QuestionClientData = z.infer<typeof questionClientDataSchema>;
export type QuestionServerData = z.infer<typeof questionServerDataSchema>;
