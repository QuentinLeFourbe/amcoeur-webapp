import {
  FormBlockClient,
  FormClientData,
  FormQuestionClient,
} from "@amcoeur/types";

export const createBlock = (block?: FormBlockClient) => {
  const randomId = crypto.randomUUID();
  return { questions: [], ...block, id: randomId } as FormBlockClient;
};

export const createQuestion = (question?: FormQuestionClient) => {
  const randomId = crypto.randomUUID();
  return { ...question, id: randomId } as FormQuestionClient;
};

export const removeEmptyQuestions = (form: FormClientData) => {
  const cleanedBlocks = form.blocks.map((block) => {
    const cleanedQuestions = block.questions.filter(
      (question) => question.questionId,
    );
    return { ...block, questions: cleanedQuestions };
  });

  return { ...form, blocks: cleanedBlocks } as FormClientData;
};
