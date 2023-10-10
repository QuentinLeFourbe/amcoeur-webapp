import React from "react";
import { css } from "../../../../styled-system/css";
import { UseFormRegister } from "react-hook-form";
import { ContactData } from "../../../types/email";

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

const FormTextArea = React.forwardRef<
  HTMLTextAreaElement,
  ReturnType<UseFormRegister<ContactData>>
>(({ ...props }: FormTextAreaProps, ref) => {
  return <textarea ref={ref} className={textAreaStyle} {...props} />;
});

export default FormTextArea;

const textAreaStyle = css({
  display: "flex",
  justifyContent: "flex-start",
  fontSize: "22px",
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "50%",
  marginTop: "8px",
});
