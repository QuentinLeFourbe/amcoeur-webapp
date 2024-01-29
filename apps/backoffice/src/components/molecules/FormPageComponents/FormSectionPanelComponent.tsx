import { SectionPanelComponent } from "@amcoeur/types";
import FormCodeArea from "../Form/FormCodeArea";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import { css } from "../../../../styled-system/css";

type FormSectionPanelComponentProps = {
  component: SectionPanelComponent;
  onChange?: (component: SectionPanelComponent) => void;
  onBlur?: (component: SectionPanelComponent) => void;
};

function FormSectionPanelComponent({
  component,
  onChange,
  onBlur,
}: FormSectionPanelComponentProps) {
  return (
    <div className={container}>
      <h2>Section</h2>
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
      <div className={groupItem}>
        <Label>Lien de navigation</Label>
        <Input
          onChange={(e) => {
            onChange?.({
              ...component,
              link: e.target.value,
            });
          }}
          onBlur={() => {
            onBlur?.(component);
          }}
          value={component.link}
        />
      </div>
      <div className={groupItem}>
        <Label>Texte bouton de navigation</Label>
        <Input
          onChange={(e) => {
            onChange?.({
              ...component,
              linkLabel: e.target.value,
            });
          }}
          onBlur={() => {
            onBlur?.(component);
          }}
          value={component.linkLabel}
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

export default FormSectionPanelComponent;

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
