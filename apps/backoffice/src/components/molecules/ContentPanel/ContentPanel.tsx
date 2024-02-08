import { ContentPanelComponent } from "@amcoeur/types";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import CodeArea from "../../atoms/CodeArea/CodeArea";

type ContentPanelProps = {
  component: ContentPanelComponent;
};

function ContentPanel({ component }: ContentPanelProps) {
  return (
    <div className={rowContainer}>
      <div>
        <h2>Section</h2>
        <Label className={property}>Titre: </Label>
        <p>{component.title}</p>

        <Label className={property}>Texte bouton: </Label>
        <p>{component.linkLabel}</p>
        <Label className={property}>Lien bouton: </Label>
        <p>{component.link}</p>
        <Label>Image: </Label>
        <img
          src={component.imageUrl}
          className={css({ maxWidth: "200px", maxHeight: "200px" })}
        />
      </div>
      <div>
        <Label className={property}>Contenu: </Label>
        <CodeArea
          maxWidth="1000px"
          editable={false}
          value={component.content}
        />
      </div>
    </div>
  );
}

export default ContentPanel;

const property = css({
  fontWeight: "bold",
  fontSize: "1.2rem",
  marginRight: "1rem",
});

const rowContainer = css({
  display: "flex",
  flexDirection: "row",
  gap: "32px",
});
