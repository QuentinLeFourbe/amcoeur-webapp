import React from "react";
import { css } from "../../../../styled-system/css";

type FormRootProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
};

function FormRoot({ children, ...props }: FormRootProps) {
  return (
    <form className={formContainer} {...props}>
      {children}
    </form>
  );
}

export default FormRoot;

const formContainer = css({});
