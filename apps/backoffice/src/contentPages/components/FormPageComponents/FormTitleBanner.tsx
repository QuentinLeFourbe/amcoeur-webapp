import { TitleBannerComponent } from "@amcoeur/types";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import Input from "../../../global/components/atoms/Input/Input";
import Label from "../../../global/components/atoms/Label/Label";
import { css } from "../../../../styled-system/css";
import FormInput from "../../../global/components/molecules/Form/FormInput";
import FormCodeArea from "../../../global/components/molecules/Form/FormCodeArea";

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
        Image 
      </FormInput>

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
