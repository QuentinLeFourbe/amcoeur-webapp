import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetAnswer, useUpdateAnswer } from "../hooks/useAnswers";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Label from "../../global/components/atoms/Label/Label";
import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import FormCheckbox from "../../global/components/molecules/Form/FormCheckbox";
import FormTextArea from "../../global/components/molecules/Form/FormTextArea";

function ViewAnswer() {
  const { answerId, formId } = useParams();
  const {
    data: { data: answerData } = {},
    isSuccess,
    isLoading,
    isError,
  } = useGetAnswer(answerId || "");
  const { mutate } = useUpdateAnswer();

  const submitAnswer = (answer: { note?: string; archived?: boolean }) => {
    mutate({ ...answer, _id: answerData?._id });
  };

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
      {isSuccess && (
        <AnswerForm
          archived={answerData?.archived || false}
          note={answerData?.note}
          onSubmit={submitAnswer}
        />
      )}
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
        {isSuccess && (
          <>
            {answerData?.answers?.map((answer, index) => (
              <div key={index}>
                <Label>{answer.field}</Label>
                <p>{answer.value as string}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ViewAnswer;

type AnswerFormProps = {
  archived: boolean;
  note?: string;
  onSubmit: (data: { note?: string; archived?: boolean }) => void;
};
const AnswerForm = ({ archived, note, onSubmit }: AnswerFormProps) => {
  const [doUpdateNote, setDoUpdateNote] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  return (
    <>
      <FormCheckbox
        onClick={(e) =>
          onSubmit({
            archived: e.currentTarget.checked,
          })
        }
        checked={archived}
      >
        Archivé
      </FormCheckbox>
      {doUpdateNote ? (
        <>
          <FormTextArea
            fixedSize
            className={css({ width: "100%", height: "200px" })}
            onChange={(e) => setEditedNote(e.currentTarget.value)}
            value={editedNote}
          >
            Notes
          </FormTextArea>
          <Button
            onClick={() => {
              onSubmit({ note: editedNote });
              setDoUpdateNote(false);
            }}
          >
            Valider
          </Button>
        </>
      ) : (
        <div>
          <p>Notes</p>
          <p
            className={css({
              minWidth: "200px",
              minHeight: "100px",
              border: "1px solid white",
              borderRadius: "8px",
              margin: "8px 0",
              padding: "1rem",
            })}
          >
            {note}
          </p>
          <Button onClick={() => setDoUpdateNote(true)}>Modifier</Button>
        </div>
      )}
    </>
  );
};
