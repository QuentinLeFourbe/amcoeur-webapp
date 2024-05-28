import mongoose from "mongoose";
import { z } from "zod";

export const AnswerSchema = z.object({
  field: z.string(),
  value: z.unknown().optional(),
});

const formAnswersBaseSchema = z.object({
  formId: z.string(),
  answers: z.array(AnswerSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const FormAnswersClientSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(formAnswersBaseSchema);

export const FormAnswersServerSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(formAnswersBaseSchema);

export type FormAnswersClient = z.infer<typeof FormAnswersClientSchema>;
export type FormAnswersServer = z.infer<typeof FormAnswersServerSchema>;
export type Answer = z.infer<typeof AnswerSchema>;
