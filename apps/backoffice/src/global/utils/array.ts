export const move = (array: unknown[], oldIndex: number, newIndex: number) => {
  const resArray = [...array];
  const element = array[oldIndex];
  resArray.splice(oldIndex, 1);
  resArray.splice(newIndex, 0, element);
  return resArray;
};
