import {
  AdoptionFilter,
  AdoptionGender,
  AdoptionSpecies,
} from "@amcoeur/types";

import { css } from "../../../styled-system/css";
import Input from "../../global/components/atoms/Input/Input";
import Select from "../../global/components/atoms/Select/Select";

type AdoptionFilterBarProps = {
  filter: AdoptionFilter;
  onFilterChange: (filter: AdoptionFilter) => void;
};

function AdoptionFilterBar({ filter, onFilterChange }: AdoptionFilterBarProps) {
  return (
    <div className={containerStyle}>
      {/* Recherche par nom */}
      <div className={filterGroupStyle}>
        <label className={labelStyle}>Recherche</label>
        <Input
          value={filter.name || ""}
          placeholder="Nom de l'animal..."
          onChange={(e) =>
            onFilterChange({ ...filter, name: e.currentTarget.value })
          }
        />
      </div>

      {/* Groupe des filtres Select */}
      <div className={selectGroupContainerStyle}>
        <div className={filterGroupStyle}>
          <label className={labelStyle}>Espèce</label>
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Chien", value: "DOG" },
              { label: "Chat", value: "CAT" },
              { label: "Cheval", value: "HORSE" },
            ]}
            value={filter.species?.[0] ?? "all"}
            onChange={(value) =>
              onFilterChange({
                ...filter,
                species:
                  value !== "all"
                    ? [value as AdoptionSpecies]
                    : undefined,
              })
            }
          />
        </div>

        <div className={filterGroupStyle}>
          <label className={labelStyle}>Sexe</label>
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Mâle", value: "MALE" },
              { label: "Femelle", value: "FEMALE" },
            ]}
            value={filter.gender ?? "all"}
            onChange={(value) =>
              onFilterChange({
                ...filter,
                gender:
                  value !== "all"
                    ? (value as AdoptionGender)
                    : undefined,
              })
            }
          />
        </div>

        <div className={filterGroupStyle}>
          <label className={labelStyle}>Adopté</label>
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Oui", value: "true" },
              { label: "Non", value: "false" },
            ]}
            value={
              filter.adopted === undefined ? "all" : filter.adopted.toString()
            }
            onChange={(value) =>
              onFilterChange({
                ...filter,
                adopted:
                  value !== "all"
                    ? value === "true"
                    : undefined,
              })
            }
          />
        </div>

        <div className={filterGroupStyle}>
          <label className={labelStyle}>Urgence</label>
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Oui", value: "true" },
              { label: "Non", value: "false" },
            ]}
            value={
              filter.emergency === undefined
                ? "all"
                : filter.emergency.toString()
            }
            onChange={(value) =>
              onFilterChange({
                ...filter,
                emergency:
                  value !== "all"
                    ? value === "true"
                    : undefined,
              })
            }
          />
        </div>

        <div className={filterGroupStyle}>
          <label className={labelStyle}>Visible</label>
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Oui", value: "true" },
              { label: "Non", value: "false" },
            ]}
            value={
              filter.visible === undefined ? "all" : filter.visible.toString()
            }
            onChange={(value) =>
              onFilterChange({
                ...filter,
                visible:
                  value !== "all"
                    ? value === "true"
                    : undefined,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

const containerStyle = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "1.5rem",
  width: "100%",
  alignItems: "flex-end",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  padding: "1.5rem",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
});

const selectGroupContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "1.5rem",
  flex: 1,
});

const filterGroupStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  minWidth: "140px",
  flex: "1 1 auto",
  sm: {
    minWidth: "180px",
  },
});

const labelStyle = css({
  fontSize: "sm",
  fontWeight: "bold",
  color: "amcoeurPale",
});

export default AdoptionFilterBar;
