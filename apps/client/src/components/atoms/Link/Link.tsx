import type { ComponentProps } from "react";
import { css } from "../../../../styled-system/css";
import {
  ClickablePrimitive,
  ClickablePrimitiveProps,
} from "../Primitives/ClickablePrimitive";

type LinkProps = ClickablePrimitiveProps & {
  variant?: "primary" | "secondary" | "tertiary" | "footer" | "default";
};

/**
 * A custom link which uses React router's Link component.
 */
function Link({ children, variant, ...props }: LinkProps) {
  let className;
  switch (variant) {
    case "primary":
      className = primaryLink;
      break;
    case "secondary":
      className = secondaryLink;
      break;
    case "tertiary":
      className = tertiaryLink;
      break;
    case "footer":
      className = linkStyle;
      break;
    default:
      className = linkStyle;
      break;
  }

  return (
    <ClickablePrimitive {...props} className={className}>
      {children}
    </ClickablePrimitive>
  );
}

export default Link;

const linkStyle = css({
  textDecoration: "none",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    textDecoration: "underline",
  },
});

const primaryLink = css({
  textDecoration: "none",
  fontWeight: "bold",
  fontFamily: "body",
  fontSize: "1.2rem",
  color: "textPrimary",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: "textSecondary",
  },
});

const secondaryLink = css({
  textDecoration: "none",
  fontWeight: "bold",
  fontFamily: "body",
  fontSize: "1.2rem",
  color: "pinkLight",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: "pinkMedium",
  },
});

const tertiaryLink = css({
  textDecoration: "none",
  fontWeight: "bold",
  fontFamily: "body",
  fontSize: "1rem",
  color: "white",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: "pinkLight",
  },
});
