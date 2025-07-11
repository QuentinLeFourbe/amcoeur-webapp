import { useState } from "react";
import { PageDataClient } from "@amcoeur/types";
import { useDeletePage, useGetPages } from "../hooks/pagesQueries";
import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Overlay from "../../global/components/atoms/Overlay/Overlay";

function ManagePages() {
  const { data, isLoading, isError } = useGetPages();
  const [pageToDelete, setPageToDelete] = useState<PageDataClient | null>(null);

  const {
    mutate: deletePage,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
  } = useDeletePage();

  return (
    <div className={container}>
      <div className={css({ display: "flex", gap: "12px" })}>
        <Button color="primary" to="/pages/creer">
          Créer une page
        </Button>
        <Button to="/pages/page-accueil">
          Modifier la page d&apos;accueil
        </Button>
      </div>
      {isDeleteError && (
        <ErrorLabel>
          Une erreur est survenue lors de la suppression de la page
        </ErrorLabel>
      )}
      {isDeleteSuccess && <p>La page a bien été supprimée</p>}
      <table className={pageTable}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Chemin d&apos;accès</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((page) => {
            if (page.route === "accueil") {
              return null;
            }
            return (
              <tr key={page._id?.toString()}>
                <td>{page.name}</td>
                <td>/{page.route}</td>
                <td>
                  <Button to={`/pages/${page._id}`}>Afficher</Button>
                </td>
                <td>
                  <Button onClick={() => setPageToDelete(page)} color="red">
                    Supprimer
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && <div>Chargement en cours des données...</div>}
      {isError && (
        <ErrorLabel>
          Une erreur est survenue lors du chargement des données
        </ErrorLabel>
      )}
      <Overlay isVisible={!!pageToDelete} onClose={() => setPageToDelete(null)}>
        <p>
          Vous êtes sur le point de supprimer la page {pageToDelete?.name}, êtes
          vous sûr ?
        </p>
        <div className={css({ display: "flex", gap: "1rem" })}>
          <Button
            color="red"
            onClick={() => pageToDelete?._id && deletePage(pageToDelete._id)}
          >
            Supprimer
          </Button>
          <Button color="secondary" onClick={() => setPageToDelete(null)}>
            Annuler
          </Button>
        </div>
      </Overlay>
    </div>
  );
}

export default ManagePages;

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});

const pageTable = css({
  "& th": {
    padding: "1rem",
    textAlign: "left",
    backgroundColor: "backgrounds.primary.intense",
  },

  "& td": {
    padding: "1rem 1rem",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },

  "& tr:hover": {
    backgroundColor: "#444",
  },
  marginBottom: "2rem",
});
