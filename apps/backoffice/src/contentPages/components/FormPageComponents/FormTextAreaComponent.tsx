import { TextAreaComponent } from "@amcoeur/types";

import FormCodeArea from "../../../global/components/molecules/Form/FormCodeArea";

type FormTextAreaComponentProps = {
  component: TextAreaComponent;
  onChange?: (component: TextAreaComponent) => void;
  onBlur?: (component: TextAreaComponent) => void;
};

function FormTextAreaComponent({ component, onChange, onBlur }: FormTextAreaComponentProps) {
  return (
    <div>
      <h2>Zone de texte</h2>
      <FormCodeArea
        // {...field}
        // errorMessage={errors?.content?.message?.toString()}
        width="medium"
        onChange={(value) => {
          onChange?.({
            ...component,
            content: value,
          });
        }}
        onBlur={() => {
          onBlur?.(component);
        }}
        value={component.content}
      >
        Contenu:
      </FormCodeArea>
    </div>
  );
}

export default FormTextAreaComponent;
