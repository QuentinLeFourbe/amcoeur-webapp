import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { css } from "../../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Checkbox from "../../atoms/Checkbox/Checkbox";

type FormCheckboxProps = ComponentPropsWithoutRef<"input"> & {
  children: React.ReactNode;
  errorMessage?: string;
};

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  function FormCheckbox(
    { children, errorMessage, ...props }: FormCheckboxProps,
    ref,
  ) {
    return (
      <div className={mainContainer}>
        <div className={checkboxContainer}>
          <Checkbox {...props} ref={ref} />
          <Label>{children}</Label>
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
