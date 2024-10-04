import { useQuery } from "@tanstack/react-query";
import { getAdoption, getAdoptions } from "../api/adoptions";
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

export const useAdoption = (id: string) => {
  const query = useQuery({
    queryFn: () => getAdoption(id),
    queryKey: ["adoption", id],
  });
  return query;
};
