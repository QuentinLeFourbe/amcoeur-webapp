import { useQuery } from "@tanstack/react-query";
import { getAdoptions } from "../api/adoptions";

export const useAdoptions = () => {
  const query = useQuery({
    queryFn: getAdoptions,
    queryKey: ["adoptions"],
  });
  return query;
};
