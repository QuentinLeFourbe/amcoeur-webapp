import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Checkbox from "../../atoms/Checkbox/Checkbox";

type FormCheckboxProps = ComponentPropsWithoutRef<"input"> & {
  children: React.ReactNode;
  errorMessage?: string;
  register: UseFormRegisterReturn;
};

const FormCheckbox = forwardRef<HTMLInputElement | null, FormCheckboxProps>(
  function FormCheckbox({ children, errorMessage = true, register }, ref) {
    return (
      <div className={mainContainer}>
        <div className={checkboxContainer}>
          <Checkbox {...register} ref={ref} />
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
