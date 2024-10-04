import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { css } from "../../../styled-system/css";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import AdoptionCard from "../components/AdoptionCard";
import AdoptionFilterBar from "../components/AdoptionFilterBar";
import { useAdoptions } from "../hooks/useAdoptions";
import { AdoptionFilter } from "../types/filter";
import Loader from "../../global/components/atoms/Loader/Loader";

function AdoptionPage() {
  const [filter, setFilter] = useState<AdoptionFilter | null>(null);
  const [debounceFilter, setDebounceFilter] = useDebounceValue(filter, 500);
  const {
    data: { data: adoptionsData } = {},
    isLoading,
    isSuccess,
    isError,
  } = useAdoptions({ filter: debounceFilter || {} });
  const adoptions = adoptionsData?.data;

  const onFilterChange = (newFilter: AdoptionFilter | null) => {
    setFilter(newFilter);
    setDebounceFilter(newFilter);
  };

  return (
    <>
      {isError && (
        <ErrorLabel>
          Une erreur s&apos;est produite lors du chargement
        </ErrorLabel>
      )}
      <div
        className={css({
          display: "flex",
          flexFlow: "row nowrap",
        })}
      >
        <AdoptionFilterBar filter={filter} setFilter={onFilterChange} />
        {isLoading && (
          <div className={css({ margin: "auto" })}>
            <Loader />
          </div>
        )}
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
