import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { css, cx } from "../../../../../styled-system/css";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Label from "../../atoms/Label/Label";

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  children: React.ReactNode;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  fixedSize?: boolean;
};

const FormTextArea = ({
  children,
  errorMessage,
  register,
  fixedSize,
  ...props
}: FormTextAreaProps) => {
  return (
    <div className={containerStyle}>
      <Label>{children}</Label>
      <textarea
        {...register}
        {...props}
        className={cx(
          textAreaStyle,
          fixedSize && notResizable,
          props.className,
        )}
      />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
};

export default FormTextArea;

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  width: "100%",
});

const textAreaStyle = css({
  display: "flex",
  justifyContent: "flex-start",
  backgroundColor: "rgba(255, 255, 255, 0.03)", // Fond noir mat léger
  color: "white!", // Texte blanc
  borderRadius: "12px",
  padding: "1.25rem",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.1)",
  outline: "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  fontSize: "sm",
  fontFamily: "body",
  minHeight: "150px",

  "&:focus": {
    borderColor: "amcoeurRose",
    backgroundColor: "rgba(225, 29, 72, 0.05)",
    boxShadow: "0 0 0 1px rgba(225, 29, 72, 0.5), 0 4px 20px rgba(0, 0, 0, 0.4)",
    transform: "translateY(-1px)",
  },

  "&::placeholder": {
    color: "rgba(255, 255, 255, 0.3)",
  },
});

const notResizable = css({
  resize: "none",
});
