import { TextAreaComponent } from "@amcoeur/types";

import { css } from "../../../../styled-system/css";
import FormCodeArea from "../../../global/components/molecules/Form/FormCodeArea";

type FormTextAreaComponentProps = {
  component: TextAreaComponent;
  onChange?: (component: TextAreaComponent) => void;
  onBlur?: (component: TextAreaComponent) => void;
};

function FormTextAreaComponent({ component, onChange, onBlur }: FormTextAreaComponentProps) {
  return (
    <div className={containerStyle}>
      <h2 className={titleStyle}>Zone de texte libre</h2>
      
      <div className={editorWrapperStyle}>
        <FormCodeArea
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
          Contenu Markdown
        </FormCodeArea>
      </div>
    </div>
  );
}

export default FormTextAreaComponent;

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  width: "100%",
  padding: "0.5rem 0",
});

const titleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
  color: "white",
  borderLeft: "4px solid",
  borderColor: "amcoeurRose",
  paddingLeft: "1rem",
  marginBottom: "0.5rem",
});

const editorWrapperStyle = css({
  width: "100%",
  minWidth: 0,
});
