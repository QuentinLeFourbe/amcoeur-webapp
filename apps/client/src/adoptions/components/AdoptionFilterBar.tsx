import {
  AdoptionGender,
  AdoptionSpecies,
  AdoptionsListCount,
} from "@amcoeur/types";
import { ComponentProps } from "react";
import { css, cx } from "../../../styled-system/css";
import FormCheckbox from "../../global/components/molecules/Form/FormCheckbox";
import Magnify from "../../global/assets/icons/magnify.svg?react";
import Cross from "../../global/assets/icons/cross.svg?react";
import { AdoptionFilter } from "../types/filter";
import { getAttributeCount } from "../utils/adoption";

type AdoptionFilterBarProps = Omit<ComponentProps<"div">, "children"> & {
  filter: AdoptionFilter | null;
  setFilter?: (filter: AdoptionFilter | null) => void;
  adoptionsCount: AdoptionsListCount;
};

function AdoptionFilterBar({
  filter,
  setFilter,
  adoptionsCount,
  ...props
}: AdoptionFilterBarProps) {
  const onResetFilter = () => {
    setFilter?.(null);
  };

  const onUpdateFilter = (addedFilter: {
    gender?: AdoptionGender;
    name?: string;
    species?: AdoptionSpecies;
  }) => {
    const newSpeciesFilter = filter?.species || [];
    const filteredSpeciesIndex = newSpeciesFilter.findIndex(
      (spec) => spec === addedFilter.species,
    );
    if (filteredSpeciesIndex > -1) {
      newSpeciesFilter?.splice(filteredSpeciesIndex, 1);
    } else if (addedFilter.species) {
      newSpeciesFilter.push(addedFilter.species);
    }

    const newFilter = {
      name: addedFilter.name !== undefined ? addedFilter.name : filter?.name,
      gender: addedFilter.gender || filter?.gender,
      species: newSpeciesFilter,
    };
    setFilter?.(newFilter);
  };

  return (
    <div
      {...props}
      className={cx(
        props.className,
        css({
          display: "flex",
          flexFlow: "column nowrap",
          gap: "32px",
          borderStyle: "solid",
          borderWidth: "0 1px 0px 0",
          borderColor: "pink.200",
          padding: "16px",
          margin: "16px",
          height: "500px",
        }),
      )}
    >
      {filter && (
        <button
          className={css({
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          })}
          type="button"
          onClick={onResetFilter}
        >
          <Cross
            className={css({
              width: "16px",
              height: "16px",
              color: "pink.600",
            })}
          />
          Réinitialiser les filtres
        </button>
      )}
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
            value={filter?.name || ""}
            onChange={(e) => onUpdateFilter({ name: e.currentTarget.value })}
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
          checked={filter?.gender === "MALE"}
          value={"MALE"}
          labelClassName={leanText}
          onChange={(e) =>
            onUpdateFilter({ gender: e.target.value as AdoptionGender })
          }
        >
          Mâle ({getAttributeCount("MALE", adoptionsCount)})
        </FormCheckbox>
        <FormCheckbox
          type="radio"
          name="gender"
          value={"FEMALE"}
          labelClassName={leanText}
          checked={filter?.gender === "FEMALE"}
          onChange={(e) =>
            onUpdateFilter({ gender: e.target.value as AdoptionGender })
          }
        >
          Femelle ({getAttributeCount("FEMALE", adoptionsCount)})
        </FormCheckbox>
      </div>
      <div className={paramContainer}>
        <p>Espèce</p>
        <FormCheckbox
          type="checkbox"
          labelClassName={leanText}
          checked={!!filter?.species?.find((species) => species === "DOG")}
          value={"DOG"}
          onChange={(e) =>
            onUpdateFilter({
              species: e.currentTarget.value as AdoptionSpecies,
            })
          }
        >
          Chien ({getAttributeCount("DOG", adoptionsCount)})
        </FormCheckbox>
        <FormCheckbox
          type="checkbox"
          labelClassName={leanText}
          checked={!!filter?.species?.find((species) => species === "CAT")}
          value={"CAT"}
          onChange={(e) =>
            onUpdateFilter({
              species: e.currentTarget.value as AdoptionSpecies,
            })
          }
        >
          Chat ({getAttributeCount("CAT", adoptionsCount)})
        </FormCheckbox>
        <FormCheckbox
          type="checkbox"
          labelClassName={leanText}
          checked={!!filter?.species?.find((species) => species === "HORSE")}
          value={"HORSE"}
          onChange={(e) =>
            onUpdateFilter({
              species: e.currentTarget.value as AdoptionSpecies,
            })
          }
        >
          Cheval ({getAttributeCount("HORSE", adoptionsCount)})
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
