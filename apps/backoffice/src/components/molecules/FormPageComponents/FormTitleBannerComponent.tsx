import { TitleBannerComponent } from "@amcoeur/types";
import FormCodeArea from "../Form/FormCodeArea";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import { css } from "../../../../styled-system/css";

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
    <div className={container}>
      <h2>Bannière titre</h2>
      <div className={groupItem}>
        <Label>Titre</Label>
        <Input
          onChange={(e) => {
            onChange?.({
              ...component,
              title: e.target.value,
            });
          }}
          onBlur={() => {
            onBlur?.(component);
          }}
          value={component.title}
        />
      </div>
      <div className={groupItem}>
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
      </div>

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

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "16px",
});

const groupItem = css({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
