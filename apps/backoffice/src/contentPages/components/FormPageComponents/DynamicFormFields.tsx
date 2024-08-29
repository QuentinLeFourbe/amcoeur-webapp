import { FormComponent } from "@amcoeur/types";
import { useGetForms } from "../../../forms/hooks/useFormsQueries";
import ErrorLabel from "../../../global/components/atoms/ErrorLabel/ErrorLabel";
import Select from "../../../global/components/atoms/Select/Select";
import { css } from "../../../../styled-system/css";

type DynamicFormFieldsProps = {
  component: FormComponent;
  onChange: (component: FormComponent) => void;
};

function DynamicFormFields({ component, onChange }: DynamicFormFieldsProps) {
  const {
    data: { data: formsData } = {},
    isSuccess,
    isError,
    isLoading,
  } = useGetForms();
  const options =
    formsData?.map((form) => ({
      label: form.name,
      value: form._id || "",
    })) || [];

  return (
    <div className={container}>
      <h2>Formulaire</h2>
      {isError && (
        <ErrorLabel>Erreur lors du chargement des formulaires</ErrorLabel>
      )}
      {isLoading && <p>Chargement des formulaires...</p>}
      {isSuccess && (
        <Select
          onChange={(value) => onChange({ ...component, formId: value })}
          value={component.formId}
          options={options}
          placeholder="Choisir un formulaire..."
          className={selectStyle}
        />
      )}
    </div>
  );
}

export default DynamicFormFields;

const container = css({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "16px",
});
const selectStyle = css({
  width: "400px",
  zIndex: "10",
});
