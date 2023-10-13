import React from "react";
import { css } from "../../../../styled-system/css";
import { UseFormRegister } from "react-hook-form";
import { ContactData } from "../../../types/email";
import FormLabel from "./FormLabel";
import FormErrorLabel from "./FormErrorLabel";

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  children: React.ReactNode;
  errorMessage?: string;
};

const FormTextArea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextAreaProps & ReturnType<UseFormRegister<ContactData>>
>(({ children, errorMessage, ...props }: FormTextAreaProps, ref) => {
  return (
    <div>
      <FormLabel>{children}</FormLabel>
      <textarea ref={ref} className={textAreaStyle} {...props} />
      {errorMessage && <FormErrorLabel>{errorMessage}</FormErrorLabel>}
    </div>
  );
});

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
