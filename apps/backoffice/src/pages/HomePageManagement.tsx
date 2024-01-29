import { useNavigate } from "react-router";
import { useState } from "react";
import { PageData } from "@amcoeur/types";
import { useGetHomePage, useUpdatePage } from "../hooks/pagesQueries";
import ErrorLabel from "../components/atoms/ErrorLabel/ErrorLabel";
import { css } from "../../styled-system/css";
import Button from "../components/atoms/Button/Button";
import PageComponentsRenderer from "../components/molecules/PageComponentsRenderer/PageComponentsRenderer";
import HomePageForm from "../components/organisms/HomePageForm/HomePageForm";

function HomePageManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetHomePage();
  const { mutate, isError: isErrorMutation } = useUpdatePage();
  console.log({ data });
  const onEdit = (data: PageData) => {
    mutate(data);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div className={editContainer}>
          <Button onClick={() => setIsEditing(false)}>Annuler</Button>
          <HomePageForm data={data?.data} onSubmit={onEdit} />
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
