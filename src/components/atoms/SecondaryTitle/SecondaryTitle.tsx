import React from "react";
import { css, cx } from "../../../../styled-system/css";

type SecondaryTitleProps = {
  children: React.ReactNode;
  classname?: string;
};

function SecondaryTitle({ children, classname }: SecondaryTitleProps) {
  return <h2 className={cx(contentTitle, classname)}>{children}</h2>;
}

const contentTitle = css({
  fontSize: "2rem",
  fontWeight: "600",
  color: "textPrimary",
  margin: "0 0 20px 0",
});

export default SecondaryTitle;
