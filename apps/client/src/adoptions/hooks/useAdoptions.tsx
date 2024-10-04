import { useQuery } from "@tanstack/react-query";
import { getAdoptions } from "../api/adoptions";
import { AdoptionFilter } from "../types/filter";

export const useAdoptions = ({
  count = false,
  filter,
}: {
  count?: boolean;
  filter?: AdoptionFilter;
}) => {
  const query = useQuery({
    queryFn: () => getAdoptions(filter),
    queryKey: ["adoptions", filter],
  });
  return query;
};
