import React from "react";
import { css } from "../../../../styled-system/css";
import { UseFormRegister } from "react-hook-form";
import { ContactData } from "../../../types/email";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = React.forwardRef<
  HTMLInputElement,
  ReturnType<UseFormRegister<ContactData>>
>(({ ...props }: FormInputProps, ref) => {
  return <input ref={ref} className={inputStyle} {...props} />;
});

export default FormInput;

const inputStyle = css({
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  padding: "1rem",
});
