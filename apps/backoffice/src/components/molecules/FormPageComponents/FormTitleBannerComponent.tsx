import { TitleBannerComponent } from "@amcoeur/types";
import FormCodeArea from "../Form/FormCodeArea";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";

type FormTitleBannerComponentProps = {
  component: TitleBannerComponent;
  onChange?: (component: TitleBannerComponent) => void;
  onBlur?: (component: TitleBannerComponent) => void;
};

function FormTitleBannerComponent({
  component,
  onChange,
  onBlur,
}: FormTitleBannerComponentProps) {
  return (
    <div>
      <h2>Bannière titre</h2>
      <Label>Image src</Label>
      <Input
        onChange={(e) => {
          onChange?.({
            ...component,
            imageUrl: e.target.value,
          });
        }}
        onBlur={() => {
          onBlur?.(component);
        }}
        value={component.imageUrl}
      />
      <FormCodeArea
        height="300px"
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
        Contenu
      </FormCodeArea>
    </div>
  );
}

export default FormTitleBannerComponent;
