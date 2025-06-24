import { FormAnswersClient } from "@amcoeur/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getForm, postAnswers } from "../api/forms";

export const useGetDynamicForm = (formId: string) => {
  const query = useQuery({
    queryFn: () => getForm(formId),
    queryKey: ["forms", formId],
  });

  return query;
};

export const useSubmitAnswers = () => {
  const mutation = useMutation({
    mutationFn: (data: FormAnswersClient) => postAnswers(data),
  });
  return mutation;
};
