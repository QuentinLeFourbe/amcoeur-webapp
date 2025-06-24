import { ComponentProps } from "react";

import { css, cx } from "../../../../../styled-system/css";

type FormProps = ComponentProps<"form"> & {
  children: React.ReactNode;
  column?: boolean;
};

export default function Form({ children, column, ...props }: FormProps) {
  return (
    <form
      {...props}
      className={cx(column ? columnStyle : formContainer, props.className)}
    >
      {children}
    </form>
  );
}

const formContainer = css({
  display: "grid",
  maxWidth: "100%",
  gridTemplateColumns: "1fr 1fr",
  justifyItems: "stretch",
  gap: "2rem",
});

const columnStyle = css({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "2rem",
});
