export const parseQueryArray = (queryString: string) => {
  if (!queryString) return undefined;

  const array = queryString.split(",");
  return array;
};

export const parseBoolean = (value: string) => {
  if (!value) return false;

  return value.toLowerCase() === "true";
};

export const parseSort = (sortParam: string | undefined) => {
  if (!sortParam) {
    return undefined;
  }

  const [field, order] = sortParam.split(":");

  if (!field) {
    return undefined;
  }

  return { [field]: (order === "desc" ? -1 : 1) as 1 | -1 };
};
