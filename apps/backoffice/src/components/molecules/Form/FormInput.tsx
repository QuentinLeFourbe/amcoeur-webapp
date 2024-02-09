import React, { ComponentPropsWithoutRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Input from "../../atoms/Input/Input";
import HelpTooltip from "../../atoms/HelpTooltip/HelpTooltip";

type FormInputProps = ComponentPropsWithoutRef<typeof Input> & {
  children: React.ReactNode;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  width?: "small" | "medium" | "large";
  helpText?: string;
};

function FormInput({
  children,
  errorMessage,
  register,
  width,
  helpText,
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
      <div
        className={css({ display: "flex", gap: "16px", alignItems: "center" })}
      >
        <Input {...props} {...register} className={widthClass} />
        {helpText && <HelpTooltip>{helpText}</HelpTooltip>}
      </div>
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
