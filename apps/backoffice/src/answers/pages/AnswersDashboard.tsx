import { useState } from "react";
import { useParams } from "react-router-dom";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Label from "../../global/components/atoms/Label/Label";
import Table from "../../global/components/atoms/Table/Table";
import FormCheckbox from "../../global/components/molecules/Form/FormCheckbox";
import Pagination from "../../global/components/molecules/Pagination/Pagination";
import { useGetAnswers } from "../hooks/useAnswers";

function AnswersDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showArchived, setShowArchived] = useState(false);
  const { formId } = useParams();
  const {
    data: { data: answersResult } = {},
    isSuccess,
    isLoading,
    isError,
  } = useGetAnswers(formId || "", {
    archived: showArchived || undefined,
    page: currentPage,
  });
  const answersData = answersResult?.data;
  const totalPages = answersResult?.totalPages || 1;
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
                    color="info"
                  >
                    Détails
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default AnswersDashboard;
