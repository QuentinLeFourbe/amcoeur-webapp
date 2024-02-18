import { TextAreaComponent } from "@amcoeur/types";
import FormCodeArea from "../Form/FormCodeArea";

type FormTextAreaProps = {
  component: TextAreaComponent;
  onChange?: (component: TextAreaComponent) => void;
  onBlur?: (component: TextAreaComponent) => void;
};

function FormTextArea({ component, onChange, onBlur }: FormTextAreaProps) {
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

export default FormTextArea;
