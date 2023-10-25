import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../ErrorLabel/ErrorLabel";

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
  height: "200px",
  resize: "none",
  padding: "1rem",
});