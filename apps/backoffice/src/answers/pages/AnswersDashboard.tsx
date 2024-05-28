import { useParams } from "react-router-dom";
import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Label from "../../global/components/atoms/Label/Label";
import Table from "../../global/components/atoms/Table/Table";
import { useGetAnswers } from "../hooks/useAnswers";

function AnswersDashboard() {
  const { formId } = useParams();
  const {
    data: { data: answersData } = {},
    isSuccess,
    isLoading,
    isError,
  } = useGetAnswers(formId || "");

  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        gap: "16px",
      })}
    >
      <Button
        className={css({ alignSelf: "start" })}
        to={`/formulaires/reponses`}
      >
        Retour
      </Button>
      {isError && <ErrorLabel>Erreur au chargement des questions</ErrorLabel>}
      {isLoading && <Label>Chargement en cours...</Label>}
      {isSuccess && (
        <Table>
          <tr>
            <th>Date de la réponse</th>
            <th></th>
          </tr>
          {answersData?.map((answer) => (
            <tr key={answer._id}>
              <td>{new Date(answer.createdAt || "").toLocaleDateString()}</td>
              <td>
                <div className={css({ display: "flex", gap: "16px" })}>
                  <Button
                    to={`/formulaires/reponses/${formId}/${answer._id}`}
                    color="blue"
                  >
                    Détails
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}

export default AnswersDashboard;
