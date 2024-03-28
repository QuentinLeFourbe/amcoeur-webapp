import { useNavigate } from "react-router";
import { useState } from "react";
import { PageDataClient } from "@amcoeur/types";
import { useGetHomePage, useUpdatePage } from "../hooks/pagesQueries";
import PageForm from "../components/PageForm/PageForm";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import PageComponentsRenderer from "../components/PageComponentsRenderer/PageComponentsRenderer";
import { css } from "../../../styled-system/css";

  function HomePageManagement() {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetHomePage();
    const { mutate, isError: isErrorMutation } = useUpdatePage();
  const onEdit = (data: PageDataClient) => {
    mutate(data);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div className={editContainer}>
          <PageForm
            homePage
            data={data?.data}
            onSubmit={onEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className={container}>
          <div className={buttonContainer}>
            <Button onClick={() => navigate("/gestion-pages")}>Retour</Button>
            <Button href={`/preview/${data?.data._id}`} target="_blank">
              Visualiser
            </Button>
            <Button onClick={() => setIsEditing(true)}>Modifier</Button>
          </div>
          {isErrorMutation && (
            <ErrorLabel>
              Une erreur est survenue lors de la modification de la page
            </ErrorLabel>
          )}
          <div>
            <label className={property}>Nom de la page: </label>
            <label>{data?.data.name}</label>
          </div>
          <div>
            <label className={property}>Chemin d&apos;accès: </label>
            <label>/{data?.data.route}</label>
          </div>
          <PageComponentsRenderer components={data?.data.components || []} />
          {isLoading && <div>Chargement en cours des données...</div>}
          {isError && (
            <ErrorLabel>
              Une erreur est survenue lors du chargement des données
            </ErrorLabel>
          )}
        </div>
      )}
    </>
  );
}

export default HomePageManagement;

const container = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 15vw",
  gap: "32px",
});

const buttonContainer = css({
  display: "flex",
  gap: "32px",
});

const property = css({
  fontWeight: "bold",
  fontSize: "1.2rem",
  marginRight: "1rem",
});

const editContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  margin: "0 15vw 100px 15vw",
});
