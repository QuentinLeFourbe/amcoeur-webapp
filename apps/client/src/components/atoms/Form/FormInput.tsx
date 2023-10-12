import React from "react";
import { css } from "../../../../styled-system/css";
import { UseFormRegister } from "react-hook-form";
import { ContactData } from "../../../types/email";
import FormLabel from "./FormLabel";
import FormErrorLabel from "./FormErrorLabel";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  errorMessage?: string;
};

const FormInput = React.forwardRef<
  HTMLInputElement,
  FormInputProps & ReturnType<UseFormRegister<ContactData>>
>(({ children, errorMessage, ...props }: FormInputProps, ref) => {
  return (
    <div>
      <FormLabel>{children}</FormLabel>
      <input ref={ref} className={inputStyle} {...props} />
      {errorMessage && <FormErrorLabel>{errorMessage}</FormErrorLabel>}
    </div>
  );
});

export default FormInput;

const inputStyle = css({
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  padding: "1rem",
  width: "100%",
});
