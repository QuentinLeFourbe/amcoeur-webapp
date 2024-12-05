import { useNavigate, useParams } from "react-router-dom";

import { css } from "../../../styled-system/css";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Label from "../../global/components/atoms/Label/Label";
import FormForm from "../components/FormForm/FormForm";
import { useGetForm, useUpdateForm } from "../hooks/useFormsQueries";

function UpdateForm() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const {
    data: { data: formData } = {},
    isLoading,
    isSuccess,
    isError,
  } = useGetForm(id);
  const { mutate: updateForm, isError: isUpdateError } = useUpdateForm({
    onSuccess: () => {
      navigate(`/formulaires`);
    },
  });

  const handleCancel = () => {
    navigate("/formulaires");
  };

  return (
    <div className={container}>
      {isUpdateError && (
        <ErrorLabel>
          Une erreur est survenue lors de la modification de la page
        </ErrorLabel>
      )}
      {isLoading && <Label>Chargement des données...</Label>}
      {isError && (
        <ErrorLabel>Erreur lors du chargement du formulaire.</ErrorLabel>
      )}
      {isSuccess && (
        <FormForm
          update
          initialData={formData}
          onCancel={handleCancel}
          onSubmit={updateForm}
        />
      )}
    </div>
  );
}

export default UpdateForm;

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 15vw",
  gap: "32px",
});
