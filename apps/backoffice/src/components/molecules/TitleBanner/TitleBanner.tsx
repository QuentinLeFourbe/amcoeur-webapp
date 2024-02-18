import { TitleBannerComponent } from "@amcoeur/types";
import Label from "../../atoms/Label/Label";
import CodeArea from "../../atoms/CodeArea/CodeArea";
import { css } from "../../../../styled-system/css";

type TitleBannerProps = {
  component: TitleBannerComponent;
};

function TitleBanner({ component }: TitleBannerProps) {
  return (
    <div>
      <h2>Bannière titre</h2>
      <Label>Titre: </Label>
      <p> {component.title}</p>
      <Label>Image: </Label>
      <img
        src={component.imageUrl}
        className={css({ maxWidth: "200px", maxHeight: "200px" })}
      />
      <Label>Contenu: </Label>
      <CodeArea editable={false} value={component.content} />
    </div>
  );
}

export default TitleBanner;
