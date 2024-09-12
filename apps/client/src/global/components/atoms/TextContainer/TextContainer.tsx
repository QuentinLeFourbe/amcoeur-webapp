import React from "react";
import { css, cx } from "../../../../../styled-system/css";

type TextContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
};

function TextContainer({ children, className, size }: TextContainerProps) {
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
  }

  return (
    <div className={cx(textContainer, sizeStyle, className)}>{children}</div>
  );
}

const textContainer = css({
  fontFamily: "body",
  "& p": {
    margin: "0 0 20px 0",
    color: "textPrimary",
  },

  "& h1": {
    fontSize: "3.5rem",
    fontWeight: "600",
    color: "textPrimary",
    margin: "0 0 40px 0",
    fontFamily: "heading",
  },

  "& h2": {
    fontSize: "2.5rem",
    fontWeight: "600",
    color: "textPrimary",
    margin: "0 0 20px 0",
  },

  "& h3": {
    fontSize: "2rem",
    fontWeight: "600",
    color: "textPrimary",
    margin: "0 0 20px 0",
  },

  "& ul": {
    listStyleType: "square",
    margin: "0 0 20px 30px",
  },

  "& em": {
    fontStyle: "italic",
  },

  "& a": {
    color: "blue.600",

    "&:hover": {
      color: "blue.500",
      textDecoration: "underline",
    },
  },

  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "flex-start",
  padding: "1rem",
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
