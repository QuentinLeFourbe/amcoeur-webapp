import { ImageComponent } from "@amcoeur/types";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import FormInput from "../Form/FormInput";

type FormImageProps = {
  component: ImageComponent;
  onChange?: (component: ImageComponent) => void;
  onBlur?: (component: ImageComponent) => void;
  errors?: Merge<
    FieldError,
    FieldErrorsImpl<NonNullable<ImageComponent>>
  >;
};

function FormImage({ component, onChange, onBlur, errors }: FormImageProps) {
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
    </div>
  );
}

export default FormImage;
