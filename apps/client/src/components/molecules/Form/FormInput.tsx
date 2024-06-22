import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Input from "../../atoms/Input/Input";

type FormInputProps = ComponentPropsWithoutRef<typeof Input> & {
  children: React.ReactNode;
  errorMessage?: string;
  width?: "small" | "medium" | "large";
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    { children, errorMessage, width, ...props }: FormInputProps,
    ref,
  ) {
    let widthClass = fullWidth;
    switch (width) {
      case "small":
        widthClass = smallWidth;
        break;
      case "medium":
        widthClass = mediumWidth;
        break;
      case "large":
        widthClass = largeWidth;
        break;
    }

    return (
      <div className={container}>
        <Label>{children}</Label>
        <Input {...props} ref={ref} className={widthClass} />
        {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
      </div>
    );
  },
);
export default FormInput;

const container = css({
  display: "flex",
  flexFlow: "column nowrap",
});

const fullWidth = css({
  width: "100%",
});

const mediumWidth = css({
  maxWidth: "300px",
});

const largeWidth = css({
  maxWidth: "500px",
});

const smallWidth = css({
  maxWidth: "100px",
});
