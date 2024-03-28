import { PageDataClient } from "@amcoeur/types";
import { useNavigate } from "react-router-dom";
import { useCreatePage } from "../hooks/pagesQueries";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import PageForm from "../components/PageForm/PageForm";
import { css } from "../../../styled-system/css";

function CreatePage() {
  const navigate = useNavigate();
  const { mutate, isError } = useCreatePage({
    onSuccess: (data) => {
      navigate(`/gestion-pages/${data.data._id}`);
    },
  });

  const handleCancel = () => {
    navigate("/gestion-pages")
  }

  const onSubmit = (data: PageDataClient) => {
    mutate(data);
  };

  return (
    <div className={container}>
      {isError && (
        <ErrorLabel>
          Une erreur est survenue lors de la création de la page
        </ErrorLabel>
      )}
      <PageForm onSubmit={onSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default CreatePage;

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 15vw",
  gap: "32px",
});
