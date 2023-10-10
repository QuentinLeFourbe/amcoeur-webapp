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
  display: "flex",
  justifyContent: "flex-start",
  fontSize: "20px",
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  width: "100%",
  padding: "15px",
  rowGap: "20px",
});
