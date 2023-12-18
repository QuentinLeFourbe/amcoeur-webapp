import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import CodeArea from "../../atoms/CodeArea/CodeArea";

type FormCodeAreaProps = React.ComponentProps<typeof CodeArea> & {
  children: React.ReactNode;
  errorMessage?: string;
};

const FormCodeArea = ({
  children,
  errorMessage,
  ...props
}: FormCodeAreaProps) => {
  return (
    <div>
      <Label>{children}</Label>
      <CodeArea {...props} height="600px" />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
};

export default FormCodeArea;
