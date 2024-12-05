import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAdoption, getAdoptions } from "../api/adoptions";
import { AdoptionFilter } from "../types/filter";

export const useAdoptions = ({
  filter = {},
  count = false,
}: {
  count?: boolean;
  filter: AdoptionFilter;
}) => {
  const query = useQuery({
    queryFn: () => getAdoptions({ filter, count }),
    queryKey: ["adoptions", filter, count],
  });
  return query;
};

export const useInfiniteAdoptions = ({
  filter = {},
  count = false,
}: {
  count?: boolean;
  filter: AdoptionFilter;
}) => {
  const query = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getAdoptions({ filter, count, page: pageParam }),
    queryKey: ["adoptions", filter, count],
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.pagination.page;
      const totalPages = lastPage.data.pagination.totalPages;
      return currentPage !== totalPages ? currentPage + 1 : undefined;
    },
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
