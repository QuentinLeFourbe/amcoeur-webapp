import { TitleBannerComponent } from "@amcoeur/types";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import Input from "../../../global/components/atoms/Input/Input";
import Label from "../../../global/components/atoms/Label/Label";
import FormCodeArea from "../../../global/components/molecules/Form/FormCodeArea";
import FormInput from "../../../global/components/molecules/Form/FormInput";

type FormTitleBannerComponentProps = {
  component: TitleBannerComponent;
  onChange?: (component: TitleBannerComponent) => void;
  onBlur?: (component: TitleBannerComponent) => void;
  errors?: Merge<
    FieldError,
    FieldErrorsImpl<NonNullable<TitleBannerComponent>>
  >;
};

function FormTitleBannerComponent({
  component,
  onChange,
  onBlur,
  errors,
}: FormTitleBannerComponentProps) {
  return (
    <div className={mainContainerStyle}>
      <h2 className={titleStyle}>Bannière Titre : {component.title || "Sans titre"}</h2>
      
      <div className={topFieldsGridStyle}>
        <div className={groupItemStyle}>
          <Label>Titre de la bannière</Label>
          <Input
            placeholder="Ex: Bienvenue chez Amcoeur"
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
        
        <div className={groupItemStyle}>
          <FormInput
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
            errorMessage={errors?.image?.message}
          >
            Image de fond
          </FormInput>
        </div>
      </div>

      <div className={editorWrapperStyle}>
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
          Contenu descriptif
        </FormCodeArea>
      </div>
    </div>
  );
}

export default FormTitleBannerComponent;

const mainContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  width: "100%",
  padding: "0.5rem 0",
});

const titleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
  color: "white",
  borderLeft: "4px solid",
  borderColor: "amcoeurRose",
  paddingLeft: "1rem",
  marginBottom: "0.5rem",
});

const topFieldsGridStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "2rem",
  md: {
    gridTemplateColumns: "1fr 1fr",
  },
});

const groupItemStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

const editorWrapperStyle = css({
  width: "100%",
  minWidth: 0,
});
