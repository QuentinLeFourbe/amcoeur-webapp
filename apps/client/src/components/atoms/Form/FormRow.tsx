import React from "react";
import { css, cx } from "../../../../styled-system/css";

type FormRowProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  centerContent?: boolean;
};

function FormRow({ children, centerContent, ...props }: FormRowProps) {
  return (
    <div className={cx(wholeLine, centerContent && flexCenter)} {...props}>
      {children}
    </div>
  );
}

export default FormRow;

const wholeLine = css({
  gridColumn: "1 / span 2",
});

const flexCenter = css({
  display: "flex",
  justifyContent: "center",
});
