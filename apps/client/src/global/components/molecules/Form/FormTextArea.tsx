import React, { ComponentProps, forwardRef } from "react";
import { css } from "../../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";

type FormTextAreaProps = ComponentProps<"textarea"> & {
  children: React.ReactNode;
  errorMessage?: string;
};

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  function FormTextArea(
    { children, errorMessage, ...props }: FormTextAreaProps,
    ref,
  ) {
    return (
      <div>
        <Label>{children}</Label>
        <textarea className={textAreaStyle} {...props} ref={ref} />
        {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
      </div>
    );
  },
);

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
