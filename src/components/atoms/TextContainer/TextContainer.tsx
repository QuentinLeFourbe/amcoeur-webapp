import React from "react";
import { css, cx } from "../../../../styled-system/css";

type TextContainerProps = {
  children: React.ReactNode;
  classname?: string;
  size?: "small" | "medium" | "large";
};

function TextContainer({ children, classname, size }: TextContainerProps) {
  let sizeStyle = "";
  switch (size) {
    case "small":
      sizeStyle = small;
      break;
    case "medium":
      sizeStyle = medium;
      break;
    case "large":
      sizeStyle = large;
      break;
    default:
      break;
  }

  return (
    <div className={cx(textContainer, sizeStyle, classname)}>{children}</div>
  );
}

const textContainer = css({
  "& p": {
    margin: "0 0 20px 0",
    color: "textPrimary",
  },

  "& h2": {
    fontSize: "2rem",
    fontWeight: "600",
    color: "textPrimary",
    margin: "0 0 20px 0",
  },

  display: "flex",
  flexFlow: "column nowrap",
});

const small = css({
  maxWidth: "400px",
});

const medium = css({
  maxWidth: "600px",
});

const large = css({
  maxWidth: "800px",
});

export default TextContainer;
