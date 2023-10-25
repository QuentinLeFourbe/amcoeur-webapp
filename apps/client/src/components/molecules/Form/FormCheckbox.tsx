import React, { ComponentPropsWithoutRef } from "react";
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


  function FormCheckbox({ children, errorMessage, register }: FormCheckboxProps) {
    return (
      <div className={mainContainer}>
        <div className={checkboxContainer}>
          <Checkbox {...register} />
          <Label>{children}</Label>
        </div>
        {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
      </div>
    );
  }


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
