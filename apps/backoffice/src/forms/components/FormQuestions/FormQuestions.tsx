import { FormQuestionClient, QuestionClientData } from "@amcoeur/types";
import DynamicContainer from "../../../global/components/organisms/DynamicContainer/DynamicContainer";
import { move } from "../../../global/utils/array";
import { createQuestion } from "../../utils/form";
import { AddButton } from "../../../global/components/atoms/AddButton/AddButton";
import FormInput from "../../../global/components/molecules/Form/FormInput";
import FormSelect from "../../../global/components/molecules/Form/FormSelect";
import { css } from "../../../../styled-system/css";
import Label from "../../../global/components/atoms/Label/Label";
import { getLabelFromValue } from "../../../questions/utils/questions";

type FormQuestionsProps = {
  value: FormQuestionClient[];
  onChange: (questions: FormQuestionClient[]) => void;
  onBlur: (questions: FormQuestionClient[]) => void;
  questionsData: QuestionClientData[];
};

function FormQuestions({
  value: questions,
  onChange,
  onBlur,
  questionsData,
}: FormQuestionsProps) {
  const questionsLabels = questionsData.map((question) => ({
    value: question._id || "",
    label: question.name,
  }));

  const handleChange = (question: FormQuestionClient, index: number) => {
    const tmpQuestions = [...questions];
    tmpQuestions[index] = question;
    onChange(tmpQuestions);
  };

  const handleBlur = (question: FormQuestionClient, index: number) => {
    const tmpQuestions = [...questions];
    tmpQuestions[index] = question;
    onBlur(tmpQuestions);
  };

  const handleMoveQuestionUp = (index: number) => {
    onChange(move(questions, index, index - 1) as FormQuestionClient[]);
  };

  const handleMoveQuestionDown = (index: number) => {
    onChange(move(questions, index, index + 1) as FormQuestionClient[]);
  };

  const handleDeleteQuestion = (index: number) => {
    const tmpQuestions = [...questions];
    tmpQuestions.splice(index, 1);
    onChange(tmpQuestions);
  };

  return (
    <>
      {questions.map((question, index) => (
        <DynamicContainer
          key={question.id}
          onDelete={() => handleDeleteQuestion(index)}
          onMoveUp={index !== 0 ? () => handleMoveQuestionUp(index) : undefined}
          onMoveDown={
            index !== questions.length - 1
              ? () => handleMoveQuestionDown(index)
              : undefined
          }
        >
          <FormSelect
            options={questionsLabels}
            value={question.questionId}
            onChange={(questionId) =>
              handleChange({ ...question, questionId }, index)
            }
          >
            Question
          </FormSelect>
          {question.questionId && (
            <QuestionDetails
              questionId={question.questionId}
              questionsData={questionsData}
            />
          )}
          <FormInput
            checked={question.isFullLine}
            type="checkbox"
            onChange={(e) =>
              handleChange({ ...question, isFullLine: e.target.checked }, index)
            }
            onBlur={(e) =>
              handleBlur({ ...question, isFullLine: e.target.checked }, index)
            }
          >
            Etendu sur la ligne
          </FormInput>
          <FormInput
            type="checkbox"
            checked={question.isRequired}
            onChange={(e) =>
              handleChange({ ...question, isRequired: e.target.checked }, index)
            }
            onBlur={(e) =>
              handleBlur({ ...question, isRequired: e.target.checked }, index)
            }
          >
            Champ requis
          </FormInput>
          <FormInput
            type="checkbox"
            checked={question.showOnlyInput}
            onChange={(e) =>
              handleChange(
                { ...question, showOnlyInput: e.target.checked },
                index,
              )
            }
            onBlur={(e) =>
              handleBlur(
                { ...question, showOnlyInput: e.target.checked },
                index,
              )
            }
          >
            Masquer le libellé
          </FormInput>
        </DynamicContainer>
      ))}
      <AddButton onClick={() => onChange([...questions, createQuestion()])} />
    </>
  );
}

type QuestionDetailsProps = {
  questionId: string;
  questionsData: QuestionClientData[];
};
const QuestionDetails = ({
  questionId,
  questionsData,
}: QuestionDetailsProps) => {
  const question = questionsData.find(
    (question) => questionId === question._id,
  );
  return question ? (
    <>
      <div className={questionDetailsStyle}>
        <Label>Contenu</Label>
        <div>{question?.content}</div>
      </div>
      <div className={questionDetailsStyle}>
        <Label>Type</Label>
        <div>{getLabelFromValue(question?.type)}</div>
      </div>
    </>
  ) : null;
};
const questionDetailsStyle = css({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "8px",
});

export default FormQuestions;
