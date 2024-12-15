import { useGetAdoptions } from "../hooks/useAdoptions";
import Button from "../../global/components/atoms/Button/Button";
import Table from "../../global/components/atoms/Table/Table";
import { css } from "../../../styled-system/css";
import { useDeleteAdoption } from "../hooks/useAdoptions";
import { useState } from "react";
import { AdoptionClientData } from "@amcoeur/types";
import Overlay from "../../global/components/atoms/Overlay/Overlay";
import Pagination from "../../global/components/molecules/Pagination/Pagination";

function AdoptionsDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: { data: adoptionsData } = {},
    isSuccess,
    isLoading,
    isError,
  } = useGetAdoptions({ page: currentPage, limit: 10 });

  const {
    mutate: deleteAdoption,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
  } = useDeleteAdoption();

  const [adoptionToDelete, setAdoptionToDelete] =
    useState<AdoptionClientData | null>(null);

  console.log("data", adoptionsData);

  const totalPages = adoptionsData?.totalPages || 1;

  return (
    <div className={container}>
      <Button to="/adoptions/creer">Crée une adoption</Button>
      {isLoading && <p>Chargement des adoptions...</p>}
      {isError && (
        <p>Une erreur est survenue lors de la récupération des adoptions</p>
      )}
      {isSuccess && adoptionsData && (
        <Table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Espece</th>
              <th>Race</th>

              <th>Sexe</th>
              <th>Visible</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {adoptionsData.data.map((adoption) => (
              <tr key={adoption._id}>
                <td>{adoption.name}</td>
                <td>{adoption.species}</td>
                <td>{adoption.race}</td>
                <td>{adoption.gender}</td>
                <td>{adoption.visible ? "Oui" : "Non"}</td>
                <td>
                  <Button to={`/adoptions/${adoption._id}`}>Afficher</Button>
                </td>
                <td>
                  <Button
                    onClick={() => setAdoptionToDelete(adoption)}
                    variants={{ color: "danger" }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Pagination
        setPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <Overlay
        isVisible={!!adoptionToDelete}
        onClose={() => setAdoptionToDelete(null)}
      >
        <p>
          Vous êtes sur le point de supprimer l'adoption de{" "}
          {adoptionToDelete?.name}, êtes vous sûr ?
        </p>
        <div className={css({ display: "flex", gap: "1rem" })}>
          <Button
            variants={{ color: "danger" }}
            onClick={() =>
              adoptionToDelete?._id && deleteAdoption(adoptionToDelete._id)
            }
          >
            Supprimer
          </Button>
          <Button
            variants={{ color: "secondary" }}
            onClick={() => setAdoptionToDelete(null)}
          >
            Annuler
          </Button>
        </div>
      </Overlay>
    </div>
  );
}

export default AdoptionsDashboard;

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});
