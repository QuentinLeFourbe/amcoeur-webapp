import React, { ComponentProps } from "react";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import MultipleSelect from "../MultipleSelect/MultipleSelect";
import { css } from "../../../../../styled-system/css";

type FormMultipleSelectProps = ComponentProps<typeof MultipleSelect> & {
  children: React.ReactNode;
  errorMessage?: string;
};

function FormMultipleSelect({
  children,
  errorMessage,
  ...props
}: FormMultipleSelectProps) {
  return (
    <div>
      <Label className={css({ marginBottom: "8px", display: "inline-block" })}>
        {children}
      </Label>
      <MultipleSelect {...props} />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
}

export default FormMultipleSelect;
