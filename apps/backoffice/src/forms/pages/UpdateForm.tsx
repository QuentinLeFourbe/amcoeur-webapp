import { useNavigate, useParams } from "react-router-dom";
import { FormClientData } from "@amcoeur/types";
import {  useGetForm, useUpdateForm } from "../hooks/useFormsQueries";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import { css } from "../../../styled-system/css";
import FormForm from "../components/FormForm/FormForm";
import { useGetQuestions } from "../../questions/hooks/useQuestions";
import Label from "../../global/components/atoms/Label/Label";

function UpdateForm() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const {
    data: { data: formData } = {},
    isLoading,
    isSuccess,
    isError,
  } = useGetForm(id);
  const {
    data: { data: questionsData } = {},
    isLoading: isQuestionLoading,
    isSuccess: isQuestionSuccess,
    isError: isQuestionError,
  } = useGetQuestions();
  const { mutate, isError: isUpdateError } = useUpdateForm({
    onSuccess: () => {
      navigate(`/formulaires`);
    },
  });

  const handleCancel = () => {
    navigate("/formulaires");
  };

  const onSubmit = (data: FormClientData) => {
    mutate(data);
  };

  return (
    <div className={container}>
      {isUpdateError && (
        <ErrorLabel>
          Une erreur est survenue lors de la modification de la page
        </ErrorLabel>
      )}
      {(isQuestionLoading || isLoading) && (
        <Label>Chargement des données...</Label>
      )}
      {isQuestionError && (
        <ErrorLabel>Erreur lors du chargement des questions.</ErrorLabel>
      )}
      {isError && (
        <ErrorLabel>Erreur lors du chargement du formulaire.</ErrorLabel>
      )}
      {isQuestionSuccess && isSuccess && (
        <FormForm
          update
          initialData={formData}
          onCancel={handleCancel}
          onSubmit={onSubmit}
          questionsData={questionsData || []}
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
