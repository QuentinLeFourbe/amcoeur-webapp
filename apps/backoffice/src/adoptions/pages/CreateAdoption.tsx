import { AdoptionClientData, CreateAdoptionDto } from "@amcoeur/types";
import { useNavigate } from "react-router";

import { css } from "../../../styled-system/css";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import AdoptionForm from "../components/AdoptionForm";
import { useCreateAdoption } from "../hooks/useAdoptions";

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

  const handleCreate = (data: CreateAdoptionDto) => {
    createAdoption(data as AdoptionClientData);
  };

  return (
    <div className={container}>
      {isCreateError && (
        <ErrorLabel>
          Une erreur est survenue lors de la création de la page
        </ErrorLabel>
      )}
      <AdoptionForm
        onSubmit={handleCreate}
        onCancel={handleCancel}
      ></AdoptionForm>
    </div>
  );
}

export default CreateAdoption;

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  maxWidth: "1200px",
  gap: "32px",
});
