import { ContentPanelComponent } from "@amcoeur/types";
import FormCodeArea from "../Form/FormCodeArea";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import { css } from "../../../../styled-system/css";
import NavButtonHelper from "../ButtonHelper/ButtonHelper";

type FormContentPanelProps = {
  component: ContentPanelComponent;
  onChange?: (component: ContentPanelComponent) => void;
  onBlur?: (component: ContentPanelComponent) => void;
};

function FormContentPanel({
  component,
  onChange,
  onBlur,
}: FormContentPanelProps) {
  return (
    <>
      <h2>Section</h2>
      <div className={rowContainer}>
        <div className={container}>
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
              type="file"
              onChange={(e) => {
                onChange?.({
                  ...component,
                  image: e.target.files && e.target.files[0],
                });
              }}
              onBlur={() => {
                onBlur?.(component);
              }}
            />
          </div>

          <div>
            <label className={subtitleStyle}>Bouton de navigation</label>
            <div className={row}>
              <div className={groupItem}>
                <Label>Texte</Label>
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
            </div>
            <NavButtonHelper className={css({maxWidth: "400px"})}/>
          </div>
        </div>
        <div>
          <FormCodeArea
            height="250px"
            maxWidth="800px"
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
      </div>
    </>
  );
}

export default FormContentPanel;

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "16px",

  "& h2": {
    fontSize: "32px",
    fontWeight: "bold",
  },
});

const rowContainer = css({
  display: "flex",
  flexDirection: "row",
  gap: "32px",
});

const groupItem = css({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const row = css({
  display: "flex",
  gap: "8px",
});

const subtitleStyle = css({
  fontSize: "24px",
  fontWeight: "bold",
});
