import { useParams } from "react-router-dom";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Label from "../../global/components/atoms/Label/Label";
import Table from "../../global/components/atoms/Table/Table";
import { useGetAnswers } from "../hooks/useAnswers";
import FormCheckbox from "../../global/components/molecules/Form/FormCheckbox";

function AnswersDashboard() {
  const { formId } = useParams();
  const {
    data: { data: answersResult } = {},
    isSuccess,
    isLoading,
    isError,
  } = useGetAnswers(formId || "");
  const answersData = answersResult?.data;
  const [showArchived, setShowArchived] = useState(false);
  const filteredData = answersData?.filter(
    (answer) => showArchived === !!answer.archived,
  );

  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        gap: "16px",
      })}
    >
      <Button className={css({ alignSelf: "start" })} to={`/formulaires`}>
        Retour
      </Button>
      <FormCheckbox
        checked={showArchived}
        onChange={(e) => setShowArchived(e.currentTarget.checked)}
      >
        Réponses archivés
      </FormCheckbox>
      {isError && <ErrorLabel>Erreur au chargement des questions</ErrorLabel>}
      {isLoading && <Label>Chargement en cours...</Label>}
      {isSuccess && (
        <Table>
          <tr>
            <th>Date de la réponse</th>
            <th>Note</th>
            <th></th>
          </tr>
          {filteredData?.map((answer) => (
            <tr key={answer._id}>
              <td>{new Date(answer.createdAt || "").toLocaleDateString()}</td>
              <td className={css({ width: "300px" })}>{answer.note}</td>
              <td>
                <div className={css({ display: "flex", gap: "16px" })}>
                  <Button
                    to={`/formulaires/reponses/${formId}/${answer._id}`}
                    variants={{ color: "info" }}
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
