import {
  AdoptionFilter,
  AdoptionGender,
  AdoptionSpecies,
} from "@amcoeur/types";

import { css } from "../../../styled-system/css";
import { HStack } from "../../../styled-system/jsx";
import Input from "../../global/components/atoms/Input/Input";
import Select from "../../global/components/atoms/Select/SelectAlt";

type AdoptionFilterBarProps = {
  filter: AdoptionFilter;
  onFilterChange: (filter: AdoptionFilter) => void;
};

function AdoptionFilterBar({ filter, onFilterChange }: AdoptionFilterBarProps) {
  return (
    <HStack gap="32px">
      <HStack>
        Recherche
        <Input
          value={filter.name}
          onChange={(e) =>
            onFilterChange({ ...filter, name: e.currentTarget.value })
          }
        />
      </HStack>
      <HStack
        className={css({
          border: "1px solid white",
          padding: "16px",
          borderRadius: "8px",
        })}
        gap="32px"
      >
        <HStack>
          Espèce :
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Chien", value: "DOG" },
              { label: "Chat", value: "CAT" },
              { label: "Cheval", value: "HORSE" },
            ]}
            defaultValue={filter.species?.[0] ?? "all"}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                species:
                  e.currentTarget.value !== "all"
                    ? [e.currentTarget.value as AdoptionSpecies]
                    : undefined,
              })
            }
          />
        </HStack>
        <HStack>
          Sexe :
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Mâle", value: "MALE" },
              { label: "Femelle", value: "FEMALE" },
            ]}
            defaultValue={filter.gender ?? "all"}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                gender:
                  e.currentTarget.value !== "all"
                    ? (e.currentTarget.value as AdoptionGender)
                    : undefined,
              })
            }
          />
        </HStack>
        <HStack>
          Adopté :
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Oui", value: "true" },
              { label: "Non", value: "false" },
            ]}
            defaultValue={
              filter.adopted === undefined ? "all" : filter.adopted.toString()
            }
            onChange={(e) =>
              onFilterChange({
                ...filter,
                adopted:
                  e.currentTarget.value !== "all"
                    ? e.currentTarget.value === "true"
                    : undefined,
              })
            }
          />
        </HStack>
        <HStack>
          Urgence :
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Oui", value: "true" },
              { label: "Non", value: "false" },
            ]}
            defaultValue={
              filter.emergency === undefined
                ? "all"
                : filter.emergency.toString()
            }
            onChange={(e) =>
              onFilterChange({
                ...filter,
                emergency:
                  e.currentTarget.value !== "all"
                    ? e.currentTarget.value === "true"
                    : undefined,
              })
            }
          />
        </HStack>
        <HStack>
          Visible :
          <Select
            options={[
              { label: "Tous", value: "all" },
              { label: "Oui", value: "true" },
              { label: "Non", value: "false" },
            ]}
            defaultValue={
              filter.visible === undefined ? "all" : filter.visible.toString()
            }
            onChange={(e) =>
              onFilterChange({
                ...filter,
                visible:
                  e.currentTarget.value !== "all"
                    ? e.currentTarget.value === "true"
                    : undefined,
              })
            }
          />
        </HStack>
      </HStack>
    </HStack>
  );
}

export default AdoptionFilterBar;
