import { useNavigate } from "react-router";

import { css } from "../../../styled-system/css";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import PageForm from "../components/PageForm/PageForm";
import { useCreatePage } from "../hooks/pagesQueries";

function CreatePage() {
  const navigate = useNavigate();
  const { mutate: createPage, isError } = useCreatePage({
    onSuccess: (data) => {
      navigate(`/pages/${data.data._id}`);
    },
  });

  const handleCancel = () => {
    navigate("/pages");
  };

  return (
    <div className={container}>
      {isError && (
        <ErrorLabel>
          Une erreur est survenue lors de la création de la page
        </ErrorLabel>
      )}
      <PageForm onSubmit={createPage} onCancel={handleCancel} />
    </div>
  );
}

export default CreatePage;

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  maxWidth: "1200px",
  gap: "32px",
});
