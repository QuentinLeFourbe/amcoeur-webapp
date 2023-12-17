import { PageData } from "@amcoeur/types";
import { useNavigate } from "react-router-dom";
import PageForm from "../components/organisms/PageForm/PageForm";
import { useCreatePage } from "../hooks/pagesQueries";
import ErrorLabel from "../components/atoms/ErrorLabel/ErrorLabel";
import { css } from "../../styled-system/css";

function CreatePage() {
  const navigate = useNavigate();
  const { mutate, isError } = useCreatePage({
    onSuccess: (data) => {
      navigate(`/gestion-pages/${data.data.id}`);
    },
  });

  useCreatePage();
  const onSubmit = (data: PageData) => {
    mutate(data);
  };

  return (
    <div className={container}>
      {isError && (
        <ErrorLabel>
          Une erreur est survenue lors de la création de la page
        </ErrorLabel>
      )}
      <PageForm onSubmit={onSubmit} />
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
