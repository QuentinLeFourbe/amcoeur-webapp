import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import { css } from "../../../../../styled-system/css";

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  children: React.ReactNode;
  errorMessage?: string;
  register: UseFormRegisterReturn;
};

const FormTextArea = ({
  children,
  errorMessage,
  register,
  ...props
}: FormTextAreaProps) => {
  return (
    <div>
      <Label>{children}</Label>
      <textarea {...register} className={textAreaStyle} {...props} />
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
  width: "100%",
  height: "800px",
  resize: "none",
  padding: "1rem",
});
