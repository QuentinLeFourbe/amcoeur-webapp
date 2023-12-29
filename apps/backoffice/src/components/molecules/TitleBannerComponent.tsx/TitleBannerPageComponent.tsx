import { TitleBannerComponent } from "@amcoeur/types";
import Label from "../../atoms/Label/Label";
import CodeArea from "../../atoms/CodeArea/CodeArea";

type TitleBannerPageComponentProps = {
  component: TitleBannerComponent;
};

function TitleBannerPageComponent({
  component,
}: TitleBannerPageComponentProps) {
  return (
    <div>
      <h2>Bannière titre</h2>
      <Label>Image src: </Label>
      <p> {component.imageUrl}</p>
      <Label>Contenu: </Label>
      <CodeArea editable={false} value={component.content} />
    </div>
  );
}

export default TitleBannerPageComponent;
