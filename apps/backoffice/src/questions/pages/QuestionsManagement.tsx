import { QuestionClientData } from "@amcoeur/types";
import { useState } from "react";
import Button from "../../global/components/atoms/Button/Button";
import { useDeleteQuestion, useGetQuestions } from "../hooks/useQuestions";
import Label from "../../global/components/atoms/Label/Label";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Table from "../../global/components/atoms/Table/Table";
import { css } from "../../../styled-system/css";
import { getLabelFromValue } from "../utils/questions";
import Overlay from "../../global/components/atoms/Overlay/Overlay";

function QuestionsManagement() {
  const { data, isSuccess, isLoading, isError } = useGetQuestions();
  const questionsData = data?.data || [];
  const [questionToDelete, setQuestionToDelete] =
    useState<QuestionClientData | null>(null);

  const {
    mutate: deleteQuestion,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
  } = useDeleteQuestion();

  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        gap: "16px",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexFlow: "column nowrap",
          gap: "16px",
        })}
      >
        {isDeleteError && (
          <ErrorLabel>
            Une erreur est survenue lors de la suppression de la page
          </ErrorLabel>
        )}
        {isDeleteSuccess && <p>La page a bien été supprimée</p>}
        <Button to="/formulaires/questions/creer">Créer</Button>
        {isError && <ErrorLabel>Erreur au chargement des questions</ErrorLabel>}
        {isLoading && <Label>Chargement en cours...</Label>}
        {isSuccess && (
          <Table className={css({ minWidth: "50vw" })}>
            <tr>
              <th>Libellé</th>
              <th>Formulation</th>
              <th>Type</th>
              <th></th>
            </tr>
            {questionsData.map((question) => {
              return (
                <tr key={question._id}>
                  <td>{question.name}</td>
                  <td>{question.content}</td>
                  <td>{getLabelFromValue(question.type)}</td>
                  <td>
                    <div className={css({ display: "flex", gap: "16px" })}>
                      <Button
                        color="blue"
                        to={`/formulaires/questions/${question._id}/modifier`}
                      >
                        Modifier
                      </Button>
                      <Button
                        onClick={() => setQuestionToDelete(question)}
                        color="red"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </div>
      <Overlay
        isVisible={!!questionToDelete}
        onClose={() => setQuestionToDelete(null)}
      >
        <p>
          Vous êtes sur le point de supprimer la question{" "}
          {questionToDelete?.name}, êtes vous sûr ?
        </p>
        <div className={css({ display: "flex", gap: "1rem" })}>
          <Button
            color="red"
            onClick={() =>
              questionToDelete?._id && deleteQuestion(questionToDelete._id)
            }
          >
            Supprimer
          </Button>
          <Button color="secondary" onClick={() => setQuestionToDelete(null)}>
            Annuler
          </Button>
        </div>
      </Overlay>
    </div>
  );
}

export default QuestionsManagement;
