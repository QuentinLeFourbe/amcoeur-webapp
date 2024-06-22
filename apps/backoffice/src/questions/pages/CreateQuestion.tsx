import { useNavigate } from "react-router-dom";
import { QuestionClientData } from "@amcoeur/types";
import { css } from "../../../styled-system/css";
import QuestionForm from "../components/QuestionForm/QuestionForm";
import { useCreateQuestion } from "../hooks/useQuestions";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";

function CreateQuestion() {
  const navigate = useNavigate();
  const { mutate, isError } = useCreateQuestion({
    onSuccess: () => {
      navigate(`/formulaires/questions`);
    },
  });

  const handleCancel = () => {
    navigate("/formulaires/questions");
  };

  const onSubmit = (data: QuestionClientData) => {
    mutate(data);
  };

  return (
    <div className={container}>
      {isError && (
        <ErrorLabel>
          Une erreur est survenue lors de la création de la page
        </ErrorLabel>
      )}
      <QuestionForm onCancel={handleCancel} onSubmit={onSubmit} />
    </div>
  );
}

export default CreateQuestion;

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 15vw",
  gap: "32px",
});
