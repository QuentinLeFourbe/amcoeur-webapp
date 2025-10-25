export const addPagination = (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];
};
