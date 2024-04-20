import type {
  FormClientData,
  FormQuestionServer,
  FormServerData,
  QuestionClientData,
  QuestionServerData,
} from "@amcoeur/types";
import Question from "../models/question.js";
import mongoose from "mongoose";

/**
 * Get unique question IDs from a form object.
 * @param form - The form object containing blocks with questions.
 * @returns  - An array of unique question IDs.
 */
const getQuestionIdsFromForm = (form: FormServerData) => {
  const questionIds = form.blocks
    .map((block) => block.questions.map((question) => question.questionId))
    .flat();
  const uniqueQuestionIds = [...new Set(questionIds)];
  return uniqueQuestionIds;
};

/**
 * Matches form questions with server data.
 *
 * @param  form - The form data.
 * @param  questions - The questions data.
 * @returns  - The form data with matched questions.
 */
const matchFormQuestions = (
  form: FormServerData,
  questions: QuestionServerData[],
) => {
  const convertedBlocks = form.blocks.map((block) => {
    const convertedQuestions = block.questions.map((question) => {
      const fullQuestion = questions.find(
        (q) => q._id?.toString() === question.questionId.toString(),
      );
      if (!fullQuestion) {
        throw new Error(
          "Cannot find corresponding question ID for ID: " +
            question.questionId,
        );
      }
      return { ...fullQuestion, ...question } as QuestionClientData;
    });
    return { ...block, questions: convertedQuestions };
  });
  return { ...form, blocks: convertedBlocks };
};

/**
 * Converts form data from server format to client format.
 * @param  form - The form data in server format.
 * @returns  A promise that resolves with the form data in client format.
 */
export const convertToFormClientData = async (form: FormServerData) => {
  const formQuestionIds = getQuestionIdsFromForm(form);
  const formQuestions = await Question.find({ _id: { in: formQuestionIds } });
  return matchFormQuestions(form, formQuestions as QuestionServerData[]);
};


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
