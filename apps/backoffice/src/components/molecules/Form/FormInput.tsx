import React, { ComponentPropsWithoutRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Input from "../../atoms/Input/Input";

type FormInputProps = ComponentPropsWithoutRef<"input"> & {
  children: React.ReactNode;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  width?: "small" | "medium" | "large";
};

function FormInput({
  children,
  errorMessage,
  register,
  width,
  ...props
}: FormInputProps) {
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
      <Input {...props} {...register} className={widthClass} />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
}

export default FormInput;

const container = css({
  display: "flex",
  flexFlow: "column nowrap",
});

const fullWidth = css({
  width: "100%",
});

const mediumWidth = css({
  width: "300px",
});

const largeWidth = css({
  width: "500px",
});

const smallWidth = css({
  width: "100px",
});
