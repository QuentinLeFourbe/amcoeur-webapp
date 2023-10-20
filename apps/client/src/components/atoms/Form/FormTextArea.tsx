import React from "react";
import { css } from "../../../../styled-system/css";
import FormLabel from "./FormLabel";
import FormErrorLabel from "./FormErrorLabel";
import type { UseFormRegisterReturn } from "react-hook-form";

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
      <FormLabel>{children}</FormLabel>
      <textarea {...register} className={textAreaStyle} {...props} />
      {errorMessage && <FormErrorLabel>{errorMessage}</FormErrorLabel>}
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
