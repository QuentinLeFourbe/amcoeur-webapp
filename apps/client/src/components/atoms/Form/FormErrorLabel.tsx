import React from "react";
import { css } from "../../../../styled-system/css";

type FormErrorLabelProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

function FormErrorLabel({ children }: FormErrorLabelProps) {
  return <p className={redDanger}>{children}</p>;
}

export default FormErrorLabel;

const redDanger = css({
  color: "red",
  fontSize: "0.8rem",
});
