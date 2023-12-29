import { TextAreaComponent } from "@amcoeur/types";
import CodeArea from "../../atoms/CodeArea/CodeArea";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";

type TextAreaPageComponentProps = {
  component: TextAreaComponent;
};

function TextAreaPageComponent({ component }: TextAreaPageComponentProps) {
  return (
    <>
      <h2>Zone de texte</h2>
      <Label className={property}>Contenu: </Label>
      <CodeArea editable={false} value={component.content} />
    </>
  );
}

export default TextAreaPageComponent;

const property = css({
  fontWeight: "bold",
  fontSize: "1.2rem",
  marginRight: "1rem",
});
