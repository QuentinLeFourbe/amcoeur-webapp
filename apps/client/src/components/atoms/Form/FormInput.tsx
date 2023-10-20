import React, { ComponentProps } from "react";
import { css } from "../../../../styled-system/css";
import type { UseFormRegisterReturn } from "react-hook-form";
import FormLabel from "./FormLabel";
import FormErrorLabel from "./FormErrorLabel";

type FormInputProps = ComponentProps<"input"> & {
  children: React.ReactNode;
  errorMessage?: string;
  register: UseFormRegisterReturn;
};

const FormInput = ({
  children,
  errorMessage,
  register,
  ...props
}: FormInputProps) => {
  return (
    <div>
      <FormLabel>{children}</FormLabel>
      <input {...register} className={inputStyle} {...props} />
      {errorMessage && <FormErrorLabel>{errorMessage}</FormErrorLabel>}
    </div>
  );
};

export default FormInput;

const inputStyle = css({
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  padding: "1rem",
  width: "100%",
});
