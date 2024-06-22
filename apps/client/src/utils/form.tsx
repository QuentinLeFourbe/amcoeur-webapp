export const getOptionsFromChoices = (choices: string[]) => {
  return choices.map((choice) => ({
    label: choice,
    value: choice,
  }));
};

export const fieldRequired = (required: boolean) => ({
  value: required,
  message: "Ce champs doit être renseigné",
});

export const fieldMaxLength = (maxLength: number) => ({
  value: maxLength,
  message: `Ce champs doit contenir moins de ${maxLength} caractères`,
});
