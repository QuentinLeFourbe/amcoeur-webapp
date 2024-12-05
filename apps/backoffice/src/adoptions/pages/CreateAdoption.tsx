import { useNavigate } from "react-router-dom";
import AdoptionForm from "../components/AdoptionForm";
import { useCreateAdoption } from "../hooks/useAdoptions";
import { css } from "../../../styled-system/css";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";

function CreateAdoption() {
  const navigate = useNavigate();
  const { mutate: createAdoption, isError: isCreateError } = useCreateAdoption({
    onSuccess: () => {
      navigate("/adoptions");
    },
  });

  const handleCancel = () => {
    navigate("/adoptions");
  };

  return (
    <div className={container}>
      {isCreateError && (
        <ErrorLabel>
          Une erreur est survenue lors de la création de la page
        </ErrorLabel>
      )}
      <AdoptionForm
        onSubmit={createAdoption}
        onCancel={handleCancel}
      ></AdoptionForm>
    </div>
  );
}

export default CreateAdoption;

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 15vw",
  gap: "32px",
});
