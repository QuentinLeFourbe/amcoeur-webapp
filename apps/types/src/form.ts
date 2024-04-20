import mongoose from "mongoose";
import { z } from "zod";

const formQuestionBaseSchema = z.object({
  id: z.string(),
  isRequired: z.boolean().optional(),
  isFullLine: z.boolean().optional(),
  showOnlyInput: z.boolean().optional(),
  showPlaceholder: z.boolean().optional(),
});

export const FormQuestionClientSchema = formQuestionBaseSchema.merge(
  z.object({
    questionId: z.string().optional(),
  }),
);

export const FormQuestionServerSchema = formQuestionBaseSchema.merge(
  z.object({
    questionId: z.custom<mongoose.Types.ObjectId>(),
  }),
);

const formBlockBaseSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  isCompact: z.boolean().optional(),
});

export const FormBlockClientSchema = formBlockBaseSchema.merge(
  z.object({
    questions: z.array(FormQuestionClientSchema),
  }),
);

export const FormBlockServerSchema = formBlockBaseSchema.merge(
  z.object({
    questions: z.array(FormQuestionServerSchema),
  }),
);

const formBaseSchema = z.object({
  name: z.string(),
});

export const FormClientDataSchema = z
  .object({
    _id: z.string().optional(),
    blocks: z.array(FormBlockClientSchema),
  })
  .merge(formBaseSchema);

export const FormServerDataSchema = z
  .object({
    _id: z.custom<mongoose.Types.ObjectId>().optional(),
    blocks: z.array(FormBlockServerSchema),
  })
  .merge(formBaseSchema);


export type FormServerData = z.infer<typeof FormServerDataSchema>;
export type FormClientData = z.infer<typeof FormClientDataSchema>;
export type FormBlockServer = z.infer<typeof FormBlockServerSchema>;
export type FormBlockClient = z.infer<typeof FormBlockClientSchema>;
export type FormQuestionServer = z.infer<typeof FormQuestionServerSchema>;
export type FormQuestionClient = z.infer<typeof FormQuestionClientSchema>;
