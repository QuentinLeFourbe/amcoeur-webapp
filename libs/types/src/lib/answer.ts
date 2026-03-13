import mongoose from "mongoose";
import { z } from "zod";

export const answerSchema = z.object({
  field: z.string(),
  value: z.unknown().optional(),
});

const formAnswersBaseSchema = z.object({
  formId: z.string(),
  answers: z.array(answerSchema),
  note: z.string().optional(),
  archived: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const formAnswersClientSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(formAnswersBaseSchema);

export const formAnswersServerSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
  })
  .merge(formAnswersBaseSchema);

export type FormAnswersClient = z.infer<typeof formAnswersClientSchema>;
export type FormAnswersServer = z.infer<typeof formAnswersServerSchema>;
export type Answer = z.infer<typeof answerSchema>;
