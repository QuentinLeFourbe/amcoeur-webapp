import { useNavigate } from "react-router-dom";
import { FormClientData } from "@amcoeur/types";
import { useCreateForm } from "../hooks/useFormsQueries";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import { css } from "../../../styled-system/css";
import FormForm from "../components/FormForm/FormForm";
import { useGetQuestions } from "../../questions/hooks/useQuestions";
import Label from "../../global/components/atoms/Label/Label";



function CreateForm () {
  const navigate = useNavigate();
  const {data: {data: questionsData} = {}, isLoading, isSuccess, isError}= useGetQuestions();
  const { mutate, isError: isCreateError } = useCreateForm({
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
      {isCreateError && (
        <ErrorLabel>
          Une erreur est survenue lors de la création de la page
        </ErrorLabel>
      )}
      {isLoading && <Label>Chargement des questions...</Label>}
      {isError && <ErrorLabel>Erreur lors du chargement des questions.</ErrorLabel>}
      {isSuccess && <FormForm onCancel={handleCancel} onSubmit={onSubmit} questionsData={questionsData || []} />}
    </div>
  );
}

export default CreateForm;

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 15vw",
  gap: "32px",
});
