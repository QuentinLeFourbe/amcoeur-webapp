import { useQuery } from "@tanstack/react-query";
import { getPages } from "../api/pages";

export const useGetPages = () => {
  const query = useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });
  return query;
};
