import React from "react";
import { css } from "../../../../../styled-system/css";

type ErrorLabelProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

function ErrorLabel({ children }: ErrorLabelProps) {
  return <p className={redDanger}>{children}</p>;
}

export default ErrorLabel;

const redDanger = css({
  color: "red",
  fontSize: "0.8rem",
});
