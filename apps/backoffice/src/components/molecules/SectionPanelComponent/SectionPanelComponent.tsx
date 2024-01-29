import { SectionPanelComponent } from "@amcoeur/types";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import CodeArea from "../../atoms/CodeArea/CodeArea";

type SectionPanelComponentProps = {
  component: SectionPanelComponent;
};

function SectionPanelComponent({ component }: SectionPanelComponentProps) {
  return (
    <>
      <h2>Section</h2>
      <Label className={property}>Titre: </Label>
      <p>{component.title}</p>
      <Label className={property}>Contenu: </Label>
      <CodeArea editable={false} value={component.content} />
      <Label className={property}>Texte bouton: </Label>
      <p>{component.linkLabel}</p>
      <Label className={property}>Lien bouton: </Label>
      <p>{component.link}</p>
    </>
  );
}

export default SectionPanelComponent;

const property = css({
  fontWeight: "bold",
  fontSize: "1.2rem",
  marginRight: "1rem",
});
