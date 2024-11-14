export type PaginatedResult<T> = {
  data: T[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
};
