import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import { css } from "../../../../../styled-system/css";
import Checkbox from "../../atoms/Checkbox/Checkbox";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Label from "../../atoms/Label/Label";

type FormCheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  children: React.ReactNode;
  errorMessage?: string;
  labelClassName?: string;
  type: "radio" | "checkbox";
};

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  function FormCheckbox(
    { children, errorMessage, labelClassName, ...props }: FormCheckboxProps,
    ref,
  ) {
    return (
      <div className={mainContainer}>
        <div className={checkboxContainer}>
          <Checkbox {...props} ref={ref} />
          <Label className={labelClassName}>{children}</Label>
        </div>
        {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
      </div>
    );
  },
);

export default FormCheckbox;

const mainContainer = css({
  display: "flex",
  flexFlow: "column nowrap",
});

const checkboxContainer = css({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1rem",
});
