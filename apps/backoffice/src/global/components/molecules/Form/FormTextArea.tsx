import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { css, cx } from "../../../../../styled-system/css";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Label from "../../atoms/Label/Label";

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  children: React.ReactNode;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  fixedSize?: boolean;
};

const FormTextArea = ({
  children,
  errorMessage,
  register,
  fixedSize,
  ...props
}: FormTextAreaProps) => {
  return (
    <div>
      <Label>{children}</Label>
      <textarea
        {...register}
        {...props}
        className={cx(
          textAreaStyle,
          fixedSize && notResizable,
          props.className,
        )}
      />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
};

export default FormTextArea;

const textAreaStyle = css({
  display: "flex",
  justifyContent: "flex-start",
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  padding: "1rem",
});

const notResizable = css({
  resize: "none",
});
