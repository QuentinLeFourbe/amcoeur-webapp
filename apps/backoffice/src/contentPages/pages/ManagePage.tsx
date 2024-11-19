import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { PageDataClient } from "@amcoeur/types";
import { useGetPage, useUpdatePage } from "../hooks/pagesQueries";
import PageForm from "../components/PageForm/PageForm";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import PageComponentsRenderer from "../components/PageComponentsRenderer/PageComponentsRenderer";
import { css } from "../../../styled-system/css";

function ManagePage() {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id || "";
  const { data: { data: pageData } = {}, isLoading, isError } = useGetPage(id);
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
            data={pageData}
            onSubmit={onEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className={container}>
          <div className={buttonContainer}>
            <Button onClick={() => navigate("/pages")}>Retour</Button>
            <Button
              href={`https://amcoeur.org/${pageData?.route}`}
              target="_blank"
            >
              Visualiser
            </Button>
            <Button
              variants={{ color: "info" }}
              onClick={() => setIsEditing(true)}
            >
              Modifier
            </Button>
          </div>
          {isErrorMutation && (
            <ErrorLabel>
              Une erreur est survenue lors de la modification de la page
            </ErrorLabel>
          )}
          <div>
            <label className={property}>Nom de la page: </label>
            <label>{pageData?.name}</label>
          </div>
          <div>
            <label className={property}>Chemin d&apos;accès: </label>
            <label>/{pageData?.route}</label>
          </div>
          <PageComponentsRenderer components={pageData?.components || []} />
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

export default ManagePage;

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
