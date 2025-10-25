import { AdoptionFilter, AdoptionSortBy } from "@amcoeur/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounceValue } from "usehooks-ts";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Pagination from "../../global/components/molecules/Pagination/Pagination";
import AdoptionFilterBar from "../components/AdoptionFilterBar";
import { useGetAdoptions } from "../hooks/useAdoptions";

function AdoptionsDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const [filter, setFilter] = useState<AdoptionFilter>({});
  const [debounceFilter, setDebounceFilter] = useDebounceValue(filter, 500);

  const [sortBy, setSort] = useState<AdoptionSortBy | undefined>();
  const [sortOrder, setSortOrder] = useState<"desc" | undefined>();
  const {
    data: { data: adoptionsData } = {},
    isSuccess,
    isLoading,
    isError,
  } = useGetAdoptions({
    page: currentPage,
    limit: 20,
    filter: debounceFilter,
    sortBy,
    sortOrder,
  });

  const totalPages = adoptionsData?.totalPages || 1;

  const handleSortBy = (attribute: AdoptionSortBy) => {
    if (attribute === sortBy && sortOrder !== "desc") setSortOrder("desc");
    else if (sortOrder !== undefined) setSortOrder(undefined);
    setSort(attribute);
  };

  const onFilterChange = (newFilter: AdoptionFilter) => {
    setFilter(newFilter);
    setDebounceFilter(newFilter);
  };

  return (
    <div className={container}>
      <Button to="/adoptions/creer">Crée une adoption</Button>
      <AdoptionFilterBar filter={filter} onFilterChange={onFilterChange} />
      {isLoading && <p>Chargement des adoptions...</p>}
      {isError && (
        <p>Une erreur est survenue lors de la récupération des adoptions</p>
      )}
      {isSuccess && adoptionsData && (
        <>
          <div>{adoptionsData.totalItems} résultats</div>
          <table
            className={css({
              "& th": {
                padding: "1rem",
                textAlign: "left",
                backgroundColor: "rose.600",
              },

              "& td": {
                padding: "4px 1rem",
                textAlign: "left",
                borderColor: "rose.100",
                borderWidth: "0 0 1px 0",
                borderStyle: "solid",
              },

              "& tr:hover": {
                backgroundColor: "#444",
              },
            })}
          >
            <thead>
              <tr>
                <th>
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={() => handleSortBy("name")}
                  >
                    Nom
                  </button>
                </th>
                <th>
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={() => handleSortBy("species")}
                  >
                    Espece
                  </button>
                </th>
                <th>
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={() => handleSortBy("race")}
                  >
                    Race
                  </button>
                </th>
                <th>
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={() => handleSortBy("gender")}
                  >
                    Sexe
                  </button>
                </th>
                <th>
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={() => handleSortBy("visible")}
                  >
                    Visible
                  </button>
                </th>
                <th>
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={() => handleSortBy("emergency")}
                  >
                    Urgence
                  </button>
                </th>
                <th>
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={() => handleSortBy("adopted")}
                  >
                    Adopté
                  </button>
                </th>
                <th>
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={() => handleSortBy("createdAt")}
                  >
                    Date de création
                  </button>
                </th>
                <th>
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={() => handleSortBy("updatedAt")}
                  >
                    Dernière modification
                  </button>
                </th>
                <th colSpan={1}></th>
              </tr>
            </thead>
            <tbody>
              {adoptionsData.data.map((adoption) => (
                <tr key={adoption._id}>
                  <td>{adoption.name}</td>
                  <td>{t(`adoptions.${adoption.species}`)}</td>
                  <td>{adoption.race}</td>
                  <td>{t(`adoptions.${adoption.gender}`)}</td>
                  <td>{adoption.visible ? "Oui" : "Non"}</td>
                  <td>{adoption.emergency ? "Oui" : "Non"}</td>
                  <td>{adoption.adopted ? "Oui" : "Non"}</td>
                  <td>
                    {new Date(adoption.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td>
                    {new Date(adoption.updatedAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td>
                    <Button color="info" to={`/adoptions/${adoption._id}`}>
                      Afficher
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <Pagination
        setPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
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
