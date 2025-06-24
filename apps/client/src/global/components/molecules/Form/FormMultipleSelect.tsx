import React, { ComponentProps } from "react";

import { css } from "../../../../../styled-system/css";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Label from "../../atoms/Label/Label";
import MultipleSelect from "../MultipleSelect/MultipleSelect";

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
