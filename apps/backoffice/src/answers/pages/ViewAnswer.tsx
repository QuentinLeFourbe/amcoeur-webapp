import { useParams } from "react-router-dom";
import { useGetAnswer } from "../hooks/useAnswers";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Label from "../../global/components/atoms/Label/Label";
import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";

function ViewAnswer() {
  const { answerId, formId } = useParams();
  const {
    data: { data: answerData } = {},
    isSuccess,
    isLoading,
    isError,
  } = useGetAnswer(answerId || "");

  return (
    <div
      className={css({
        margin: "0 10vw 0 10vw",
        display: "flex",
        flexFlow: "column nowrap",
        gap: "32px",
      })}
    >
      <Button to={`/formulaires/reponses/${formId}`}>Retour</Button>
      <div
        className={css({
          display: "flex",
          flexFlow: "column nowrap",
          gap: "16px",
          border: "1px solid white",
          borderRadius: "8px",
          padding: "32px",
        })}
      >
        {isError && <ErrorLabel>Erreur au chargement des questions</ErrorLabel>}
        {isLoading && <Label>Chargement en cours...</Label>}
        {isSuccess &&
          answerData?.answers?.map((answer, index) => (
            <div key={index}>
              <Label>{answer.field}</Label>
              <p>{answer.value as string}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewAnswer;
