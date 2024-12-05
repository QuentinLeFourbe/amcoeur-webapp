import { TextAreaComponent } from "@amcoeur/types";

import { css } from "../../../../styled-system/css";
import CodeArea from "../../../global/components/atoms/CodeArea/CodeArea";
import Label from "../../../global/components/atoms/Label/Label";

type TextAreaProps = {
  component: TextAreaComponent;
};

function TextArea({ component }: TextAreaProps) {
  return (
    <>
      <h2>Zone de texte</h2>
      <Label className={property}>Contenu: </Label>
      <CodeArea editable={false} value={component.content} />
    </>
  );
}

export default TextArea;

const property = css({
  fontWeight: "bold",
  fontSize: "1.2rem",
  marginRight: "1rem",
});
