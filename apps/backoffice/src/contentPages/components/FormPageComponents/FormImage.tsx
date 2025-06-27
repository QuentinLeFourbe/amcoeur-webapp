import { ImageComponent } from "@amcoeur/types";
import { useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import { css } from "../../../../styled-system/css";
import Button from "../../../global/components/atoms/Button/Button";
import FormInput from "../../../global/components/molecules/Form/FormInput";

type FormImageProps = {
  component: ImageComponent;
  onChange?: (component: ImageComponent) => void;
  onBlur?: (component: ImageComponent) => void;
  errors?: Merge<FieldError, FieldErrorsImpl<NonNullable<ImageComponent>>>;
};

function FormImage({ component, onChange, onBlur, errors }: FormImageProps) {
  const [showCaptionField, setShowCaptionField] = useState(!!component.caption);

  const handleRemoveCaption = () => {
    setShowCaptionField(false);
    onChange?.({ ...component, caption: undefined });
  };

  return (
    <div>
      <h2>Image</h2>
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
      {!showCaptionField && (
        <Button
          color="info"
          type="button"
          className={css({ margin: "16px 0" })}
          onClick={() => setShowCaptionField(true)}
        >
          Ajouter une légende
        </Button>
      )}
      {showCaptionField && (
        <>
          <FormInput
            onChange={(e) => {
              onChange?.({
                ...component,
                caption: e.target.value,
              });
            }}
            onBlur={() => {
              onBlur?.(component);
            }}
            value={component.caption}
            className={css({ width: "100%" })}
            removable
            onRemove={handleRemoveCaption}
          >
            Légende
          </FormInput>
        </>
      )}
    </div>
  );
}

export default FormImage;
