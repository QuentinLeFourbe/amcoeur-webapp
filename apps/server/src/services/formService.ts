import type {
  FormClientData,
  FormQuestionServer,
  FormServerData,
} from "@amcoeur/types";
import mongoose from "mongoose";


/**
 * Converts client-side form data to server-side format.
 * @param form - The form data in client-side format.
 * @returns The form data in server-side format.
 */
export const convertToFormServerData = (form: FormClientData) => {
  const blocks = form.blocks.map((block) => {
    const questionsOnlyWithId = block.questions.filter(
      (question) => question.questionId,
    );
    const serverQuestions = questionsOnlyWithId.map((question) => {
      const serverQuestion = {
        ...question,
        questionId: new mongoose.Types.ObjectId(question.questionId),
      };
      return serverQuestion as FormQuestionServer;
    });

    return { ...block, questions: serverQuestions };
  });

  const convertedForm = {
    ...form,
    blocks,
    _id: form._id ? new mongoose.Types.ObjectId(form._id) : undefined,
  };

  return convertedForm as FormServerData;
};
