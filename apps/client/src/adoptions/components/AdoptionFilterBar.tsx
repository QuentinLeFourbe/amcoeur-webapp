import { AdoptionGender, AdoptionSpecies } from "@amcoeur/types";
import { css } from "../../../styled-system/css";
import FormCheckbox from "../../global/components/molecules/Form/FormCheckbox";
import Magnify from "../../global/assets/icons/magnify.svg?react";
import { AdoptionFilter } from "../types/filter";
import Button from "../../global/components/atoms/Button/Button";

type AdoptionFilterBarProps = {
  filter: AdoptionFilter;
  setFilter?: (filter: AdoptionFilter) => void;
};

function AdoptionFilterBar({ filter = {}, setFilter }: AdoptionFilterBarProps) {
  const onResetFilter = () => {
    setFilter?.({});
  };

  const onFilterName = (name: string) => {
    setFilter?.({ ...filter, name });
  };

  const onFilterGender = (gender: AdoptionGender) => {
    setFilter?.({ ...filter, gender });
  };

  const onFilterSpecies = (species: AdoptionSpecies) => {
    const newSpeciesFilter = filter.species || [];
    const index = newSpeciesFilter.findIndex((spec) => spec === species);
    if (index > -1) {
      newSpeciesFilter?.splice(index, 1);
    } else {
      newSpeciesFilter.push(species);
    }
    setFilter?.({ ...filter, species: newSpeciesFilter });
  };

  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "32px",
        borderStyle: "solid",
        borderWidth: "0 1px 0px 0",
        borderColor: "pink.200",
        padding: "16px",
        margin: "16px",
      })}
    >
      <Button type="button" onClick={onResetFilter}>
        Réinitialiser les filtres
      </Button>
      <div className={paramContainer}>
        <p>Nom</p>
        <div
          className={css({
            position: "relative",
            borderStyle: "solid",
            borderColor: "pink.200",
            borderWidth: "0 0 1px 0",
          })}
        >
          <input
            type="text"
            className={css({
              padding: "8px 8px 2px 28px",
              "&:focus": { outline: "transparent" },
            })}
            value={filter.name || ""}
            onChange={(e) => onFilterName(e.currentTarget.value)}
          />
          <Magnify
            className={css({
              position: "absolute",
              left: "0",
              top: "25%",
              height: "20px",
              width: "20px",
              color: "pink.200",
            })}
          />
        </div>
      </div>
      <div className={paramContainer}>
        <p>Sexe</p>
        <FormCheckbox
          type="radio"
          name="gender"
          checked={filter.gender === "MALE"}
          value={"MALE"}
          labelClassName={leanText}
          onChange={(e) => onFilterGender(e.target.value as AdoptionGender)}
        >
          Mâle
        </FormCheckbox>
        <FormCheckbox
          type="radio"
          name="gender"
          value={"FEMALE"}
          labelClassName={leanText}
          checked={filter.gender === "FEMALE"}
          onChange={(e) => onFilterGender(e.target.value as AdoptionGender)}
        >
          Femelle
        </FormCheckbox>
      </div>
      <div className={paramContainer}>
        <p>Espèce</p>
        <FormCheckbox
          type="checkbox"
          labelClassName={leanText}
          checked={!!filter.species?.find((species) => species === "DOG")}
          value={"DOG"}
          onChange={(e) =>
            onFilterSpecies(e.currentTarget.value as AdoptionSpecies)
          }
        >
          Chien
        </FormCheckbox>
        <FormCheckbox
          type="checkbox"
          labelClassName={leanText}
          checked={!!filter.species?.find((species) => species === "CAT")}
          value={"CAT"}
          onChange={(e) =>
            onFilterSpecies(e.currentTarget.value as AdoptionSpecies)
          }
        >
          Chat
        </FormCheckbox>
        <FormCheckbox
          type="checkbox"
          labelClassName={leanText}
          checked={!!filter.species?.find((species) => species === "HORSE")}
          value={"HORSE"}
          onChange={(e) =>
            onFilterSpecies(e.currentTarget.value as AdoptionSpecies)
          }
        >
          Cheval
        </FormCheckbox>
      </div>
    </div>
  );
}

export default AdoptionFilterBar;

const paramContainer = css({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "8px",
  "& p": {
    fontWeight: "bold",
  },
});

const leanText = css({
  fontWeight: "normal",
});
