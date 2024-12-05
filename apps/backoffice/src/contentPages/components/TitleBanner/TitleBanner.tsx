import { TitleBannerComponent } from "@amcoeur/types";

import { css } from "../../../../styled-system/css";
import CodeArea from "../../../global/components/atoms/CodeArea/CodeArea";
import Label from "../../../global/components/atoms/Label/Label";

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
