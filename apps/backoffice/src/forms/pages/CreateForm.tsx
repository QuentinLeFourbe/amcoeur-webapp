import { useNavigate } from "react-router-dom";
import { useCreateForm } from "../hooks/useFormsQueries";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import { css } from "../../../styled-system/css";
import FormForm from "../components/FormForm/FormForm";

function CreateForm() {
  const navigate = useNavigate();
  const { mutate: createForm, isError: isCreateError } = useCreateForm({
    onSuccess: () => {
      navigate(`/formulaires`);
    },
  });

  const handleCancel = () => {
    navigate("/formulaires");
  };

  return (
    <div className={container}>
      {isCreateError && (
        <ErrorLabel>
          Une erreur est survenue lors de la création de la page
        </ErrorLabel>
      )}
      <FormForm onCancel={handleCancel} onSubmit={createForm} />
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
