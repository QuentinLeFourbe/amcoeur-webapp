import { css } from "../../styled-system/css";
import Button from "../components/atoms/Button/Button";
import ErrorLabel from "../components/atoms/ErrorLabel/ErrorLabel";
import { useDeletePage, useGetPages } from "../hooks/pagesQueries";

function ManagePages() {
  const { data, isLoading, isError } = useGetPages();

  const {
    mutate: deletePage,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
  } = useDeletePage();

  return (
    <div className={container}>
      <Button href="/gestion-pages/creer">Créer une page</Button>
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
            return (
              <tr key={page.id}>
                <td>{page.name}</td>
                <td>{page.route}</td>
                <td>
                  <Button href={`/gestion-pages/${page.id}`}>Afficher</Button>
                </td>
                <td>
                  <Button onClick={() => page.id && deletePage(page.id)}>
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
