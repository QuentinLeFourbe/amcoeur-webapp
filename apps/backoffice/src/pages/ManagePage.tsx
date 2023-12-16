import { useParams } from "react-router";
import { useState } from "react";
import { PageData } from "@amcoeur/types";
import { useGetPage, useUpdatePage } from "../hooks/pagesQueries";
import ErrorLabel from "../components/atoms/ErrorLabel/ErrorLabel";
import { css } from "../../styled-system/css";
import PageForm from "../components/organisms/PageForm/PageForm";
import Button from "../components/atoms/Button/Button";

function ManagePage() {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const id = params.id || "";
  const { data, isLoading, isError } = useGetPage(id);
  const { mutate, isError: isErrorMutation } = useUpdatePage();

  const onEdit = (data: PageData) => {
    console.log(data);
    mutate(data);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div className={editContainer}>
          <Button onClick={() => setIsEditing(false)}>Annuler</Button>
          <PageForm data={data?.data} onSubmit={onEdit} />
        </div>
      ) : (
        <div className={container}>
          <Button onClick={() => setIsEditing(true)}>Modifier</Button>
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
            <label>{data?.data.route}</label>
          </div>
          <label className={property}>Contenu: </label>
          <p>{data?.data.content}</p>
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
