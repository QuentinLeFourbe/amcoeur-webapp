import { FormComponent } from "@amcoeur/types";
import { useGetForm } from "../../../forms/hooks/useFormsQueries";
import ErrorLabel from "../../../global/components/atoms/ErrorLabel/ErrorLabel";

type PageFormRendererProps = {
  component: FormComponent;
};

function PageFormRenderer({ component }: PageFormRendererProps) {
  const {
    data: { data: formData } = {},
    isSuccess,
    isError,
    isLoading,
  } = useGetForm(component.formId || "");

  return (
    <div>
      <h2>Formulaire</h2>
      {isSuccess && <p>{formData?.name}</p>}
      {isLoading && <p>Chargement...</p>}
      {isError && (
        <p>
          <ErrorLabel>Erreur lors du chargement du formulaire</ErrorLabel>{" "}
        </p>
      )}
    </div>
  );
}

export default PageFormRenderer;
