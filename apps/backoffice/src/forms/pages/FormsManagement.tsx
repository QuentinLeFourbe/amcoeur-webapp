import { FormSummary } from "@amcoeur/types";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Label from "../../global/components/atoms/Label/Label";
import Overlay from "../../global/components/atoms/Overlay/Overlay";
import Table from "../../global/components/atoms/Table/Table";
import {
  useDeleteForm,
  useDuplicateForm,
  useGetForms,
} from "../hooks/useFormsQueries";

function FormsManagement() {
  const {
    data: { data: formsData } = {},
    isSuccess,
    isLoading,
    isError,
  } = useGetForms();
  const {
    mutate: deleteForm,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
  } = useDeleteForm();
  const {
    mutate: duplicateForm,
    isError: isDuplicateError,
    isSuccess: isDuplicateSuccess,
  } = useDuplicateForm();

  const [formToDelete, setFormToDelete] = useState<FormSummary | null>(null);
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
            Une erreur est survenue lors de la suppression du formulaire
          </ErrorLabel>
        )}
        {isDeleteSuccess && <p>Le formulaire a bien été supprimé</p>}
        {isDuplicateError && (
          <ErrorLabel>
            Une erreur est survenue lors de la duplication du formulaire
          </ErrorLabel>
        )}
        {isDuplicateSuccess && <p>Le formulaire a bien été dupliqué</p>}
        <Button to="/formulaires/creer">Créer</Button>
        {isError && <ErrorLabel>Erreur au chargement des questions</ErrorLabel>}
        {isLoading && <Label>Chargement en cours...</Label>}
        {isSuccess && (
          <Table>
            <tr>
              <th>Nom</th>
              <th>Nombre de réponse</th>
              <th></th>
            </tr>
            {formsData?.map((form) => (
              <tr key={form._id}>
                <td>{form.name}</td>
                <td>{form.answerCount}</td>
                <td>
                  <div className={css({ display: "flex", gap: "16px" })}>
                    <Button
                      to={`/formulaires/reponses/${form._id}`}
                      color="green"
                    >
                      Réponses
                    </Button>
                    <Button
                      to={`/formulaires/modifier/${form._id}`}
                      color="blue"
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => duplicateForm(form._id || "")}
                      color="blue"
                    >
                      Dupliquer
                    </Button>
                    <Button onClick={() => setFormToDelete(form)} color="red">
                      Supprimer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>
      <Overlay isVisible={!!formToDelete} onClose={() => setFormToDelete(null)}>
        <p>
          Vous êtes sur le point de supprimer le formulaire {formToDelete?.name}
          , êtes vous sûr ?
        </p>
        <div className={css({ display: "flex", gap: "1rem" })}>
          <Button
            color="red"
            onClick={() => formToDelete?._id && deleteForm(formToDelete._id)}
          >
            Supprimer
          </Button>
          <Button color="secondary" onClick={() => setFormToDelete(null)}>
            Annuler
          </Button>
        </div>
      </Overlay>
    </div>
  );
}

export default FormsManagement;
