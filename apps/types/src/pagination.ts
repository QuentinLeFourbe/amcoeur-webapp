export type PaginatedResult<T> = {
  data: T[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  count?: CountResult | undefined;
};

export type CountResult = {
  [key: string]: { key: string; value: number }[];
};
