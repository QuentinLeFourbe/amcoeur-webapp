import { useQuery } from "@tanstack/react-query";

import { getHomePage, getPage, getPages } from "../api/pages";

export const useGetPage = (id: number | string, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["page", id],
    queryFn: () => getPage(id),
    enabled: !!id && enabled,
    select: (data) => {
      return data.data;
    },
  });
  return query;
};

export const useGetPageByRoute = (route: string, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["page", route],
    queryFn: () => getPages({ params: { route } }),
    enabled: !!route && enabled,
    select: (data) => {
      return data.data.data?.[0];
    },
    retry: false,
  });
  return query;
};

export const useGetHomePage = () => {
  const query = useQuery({
    queryKey: ["homePage"],
    queryFn: () => getHomePage(),
    select: (data) => {
      return data.data;
    },
  });
  return query;
};
