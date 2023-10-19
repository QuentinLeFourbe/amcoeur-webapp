import React, { ComponentProps } from "react";
import { css } from "../../../../styled-system/css";
import { UseFormRegister } from "react-hook-form";
import FormLabel from "./FormLabel";
import FormErrorLabel from "./FormErrorLabel";
import { ContactFormData } from "@amcoeur/types";

type FormInputProps = ComponentProps<"input"> & {
  children: React.ReactNode;
  errorMessage?: string;
};

const FormInput = React.forwardRef<
  HTMLInputElement,
  FormInputProps & ReturnType<UseFormRegister<ContactFormData>>
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
