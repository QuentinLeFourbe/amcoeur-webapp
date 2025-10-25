import { AdoptionCount } from "@amcoeur/types";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounceValue } from "usehooks-ts";

import { css } from "../../../styled-system/css";
import FacebookIcon from "../../global/assets/icons/facebook.svg?react";
import ErrorLabel from "../../global/components/atoms/ErrorLabel/ErrorLabel";
import Loader from "../../global/components/atoms/Loader/Loader";
import TitlePanel from "../../global/components/molecules/TitlePanel/TitlePanel";
import AdoptionCard from "../components/AdoptionCard";
import AdoptionFilterBar from "../components/AdoptionFilterBar";
import { useInfiniteAdoptions } from "../hooks/useAdoptions";
import { AdoptionFilter } from "../types/filter";

function AdoptionsDashboard() {
  const [filter, setFilter] = useState<AdoptionFilter | null>(null);
  const [debounceFilter, setDebounceFilter] = useDebounceValue(filter, 500);
  const { t } = useTranslation();

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    isSuccess,
  } = useInfiniteAdoptions({
    filter: debounceFilter || {},
    count: true,
  });

  const adoptions = infiniteData?.pages?.map((page) => page.data.data).flat();
  const totalAdoptions = infiniteData?.pages?.[0].data.totalItems || 0;
  const adoptionsCount = infiniteData?.pages?.[0].data.count as AdoptionCount;

  const observerRef = useRef<HTMLDivElement>(null);

  const onFilterChange = (newFilter: AdoptionFilter | null) => {
    setFilter(newFilter);
    setDebounceFilter(newFilter);
  };

  //Observer afin de vérifier sur l'observer est visible sur l'écran et ainsi charger une nouvelle page automatiquement
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  });

  return (
    <>
      <TitlePanel>
        <h1>{t("adoption.title")}</h1>
      </TitlePanel>
      <div
        className={css({
          display: "flex",
          flexFlow: "row nowrap",
          height: "100%",
          margin: "10vh 0",
        })}
      >
        <AdoptionFilterBar
          className={css({
            position: "sticky",
            top: "100px",
          })}
          filter={filter}
          setFilter={onFilterChange}
          adoptionsCount={adoptionsCount || {}}
        />
        {isError && (
          <ErrorLabel>
            Une erreur s&apos;est produite lors du chargement
          </ErrorLabel>
        )}
        {isLoading && (
          <div className={css({ margin: "auto" })}>
            <Loader />
          </div>
        )}
        {isSuccess && (
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            })}
          >
            {totalAdoptions > 0 && (
              <p>
                {totalAdoptions > 1
                  ? t("adoption.items_found_plural", {
                      count: totalAdoptions,
                    })
                  : t("adoption.items_found", { count: totalAdoptions })}
              </p>
            )}
            {totalAdoptions === 0 && (
              <div
                className={css({
                  margin: "auto",
                  fontSize: "header",
                  fontWeight: "bold",
                  color: "red.300",
                  display: "flex",
                  flexDir: "column",
                  alignItems: "center",
                  gap: "15px",
                })}
              >
                <p>{t("adoption.no_result")}</p>
                <p>{t("adoption.no_result_facebook")}</p>

                <a
                  className={facebookLogo}
                  href="https://www.facebook.com/amcoeur.protection.animaux"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon />
                </a>
              </div>
            )}
            {adoptions && adoptions.length > 0 && (
              <>
                <div
                  className={css({
                    display: "flex",
                    flexFlow: "row wrap",
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
                      href={`/adoptions/${adoption._id}`}
                      emergency={adoption.emergency}
                    />
                  ))}
                </div>
                {isFetchingNextPage && (
                  <div
                    className={css({
                      display: "flex",
                      justifyContent: "center",
                    })}
                  >
                    <Loader />
                  </div>
                )}
                <div ref={observerRef} className={css({ height: "1px" })} />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AdoptionsDashboard;

const facebookLogo = css({
  display: "inline-block",
  width: "50px",
  height: "50px",
  color: "textPrimary",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: "red.300",
  },
});
