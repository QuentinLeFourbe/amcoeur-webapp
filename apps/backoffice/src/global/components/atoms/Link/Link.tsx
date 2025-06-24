import type { ComponentProps } from "react";

import { css, cx } from "../../../../../styled-system/css";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";

type LinkProps = ComponentProps<typeof ClickablePrimitive> & {
  variant?: "primary" | "secondary" | "tertiary" | "footer" | "default";
  isActive?: boolean;
};

/**
 * A Link component which can be used for a button, an anchor or a Link from React Router
 */
function Link({ children, variant, isActive, ...props }: LinkProps) {
  let className;
  switch (variant) {
    case "primary":
      className = cx("primary", primaryLink);
      break;
    case "secondary":
      className = cx("secondary", secondaryLink);
      break;
    case "tertiary":
      className = cx("tertiary", tertiaryLink);
      break;
    case "footer":
      className = cx("footer-link", linkStyle);
      break;
    default:
      className = linkStyle;
      break;
  }

  return (
    <ClickablePrimitive
      {...props}
      className={cx(className, linkBaseStyle, isActive && "link-active")}
    >
      {children}
    </ClickablePrimitive>
  );
}

export default Link;

const linkBaseStyle = css({
  cursor: "pointer",
  textDecoration: "none",
  transition: "color 0.2s ease-in-out",
  fontWeight: "bold",
  fontFamily: "body",

  "&.link-active": {
    pointerEvents: "none",
    cursor: "default",
  },
});

const linkStyle = css({
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

const primaryLink = css({
  fontSize: "1.2rem",
  color: "gray.50",
  "&:hover": {
    color: "gray.700",
  },
  "&.link-active": {
    color: "rose.500",
    borderColor: "rose.500",
    borderStyle: "solid",
    borderWidth: "0 0 2px 0",
  },
});

const secondaryLink = css({
  fontSize: "1.2rem",
  color: "gray.50",
  "&:hover": {
    color: "rose.400",
  },
  "&.link-active": {
    color: "rose.500",
    borderColor: "rose.500",
    borderStyle: "solid",
    borderWidth: "0 0 2px 0",
  },
});

const tertiaryLink = css({
  fontSize: "1rem",
  color: "white",
  "&:hover": {
    color: "pinkLight",
  },
});
