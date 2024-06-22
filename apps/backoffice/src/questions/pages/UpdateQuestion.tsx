import { useNavigate, useParams } from "react-router-dom";
import { useGetQuestion, useUpdateQuestion } from "../hooks/useQuestions";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import QuestionForm from "../components/QuestionForm/QuestionForm";
import Label from "../../global/components/atoms/Label/Label";
import { css } from "../../../styled-system/css";

function UpdateQuestion() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    data: { data: questionData } = {},
    isError,
    isLoading,
    isSuccess,
  } = useGetQuestion(params.id || "");
  const { mutate, isError: isUpdateError } = useUpdateQuestion({
    onSuccess: () => navigate("/formulaires/questions"),
  });

  return (
    <div className={container}>
      {isError && (
        <ErrorLabel>
          Une erreur est survenue lors du chargement de la question
        </ErrorLabel>
      )}
      {isUpdateError && (
        <ErrorLabel>
          Une erreur est survenue lors de la modification de la question
        </ErrorLabel>
      )}
      {isLoading && <Label>Chargement en cours de la page</Label>}

      {isSuccess && (
        <QuestionForm
          initialData={questionData}
          onSubmit={(data) => mutate(data)}
          onCancel={() => navigate("/formulaires/questions")}
          update
        />
      )}
    </div>
  );
}

export default UpdateQuestion;

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 15vw",
  gap: "32px",
});
