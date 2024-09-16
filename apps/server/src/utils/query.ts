export const queryToArray = (queryString: string) => {
  if (!queryString) return queryString;

  const array = queryString.split(",");
  return array;
};

export const parseBoolean = (value: string) => {
  if (!value) return false;

  return value.toLowerCase() === "true";
};
