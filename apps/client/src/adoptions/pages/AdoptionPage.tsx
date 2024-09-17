import { useState } from "react";
import { css } from "../../../styled-system/css";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import AdoptionCard from "../components/AdoptionCard";
import AdoptionFilterBar from "../components/AdoptionFilterBar";
import { useAdoptions } from "../hooks/useAdoptions";
import { AdoptionFilter } from "../types/filter";

function AdoptionPage() {
  const [filter, setFilter] = useState<AdoptionFilter | null>(null);
  const {
    data: { data: adoptionsData } = {},
    isLoading,
    isSuccess,
    isError,
  } = useAdoptions(filter || {});
  const adoptions = adoptionsData?.data;

  return (
    <>
      {isError && (
        <ErrorLabel>
          Une erreur s&apos;est produite lors du chargement
        </ErrorLabel>
      )}
      {isLoading && <div>Chargement en cours...</div>}
      <div
        className={css({
          display: "flex",
          flexFlow: "row nowrap",
        })}
      >
        <AdoptionFilterBar filter={filter} setFilter={setFilter} />
        {isSuccess && (
          <div
            className={css({
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "64px",
              margin: "32px",
            })}
          >
            {adoptions?.map((adoption) => (
              <AdoptionCard
                key={adoption._id}
                name={adoption.name}
                gender={adoption.gender}
                imageSrc={adoption.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AdoptionPage;
