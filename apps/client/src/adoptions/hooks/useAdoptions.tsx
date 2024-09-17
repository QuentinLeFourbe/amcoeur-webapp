import { useQuery } from "@tanstack/react-query";
import { getAdoptions } from "../api/adoptions";
import { AdoptionFilter } from "../types/filter";

export const useAdoptions = (filter: AdoptionFilter) => {
  const query = useQuery({
    queryFn: () => getAdoptions(filter),
    queryKey: ["adoptions", filter],
  });
  return query;
};
