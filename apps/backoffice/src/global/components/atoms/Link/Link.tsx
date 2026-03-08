import { ReactNode, type ComponentProps } from "react";

import { css, cx } from "../../../../../styled-system/css";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";

type LinkProps = ComponentProps<typeof ClickablePrimitive> & {
  variant?: "primary" | "secondary" | "tertiary" | "footer" | "default" | "sidebar";
  isActive?: boolean;
  icon?: ReactNode;
};

/**
 * A Link component which can be used for a button, an anchor or a Link from React Router
 */
function Link({ children, variant, isActive, icon, ...props }: LinkProps) {
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
    case "sidebar":
      className = cx("sidebar-link", sidebarLink);
      break;
    default:
      className = linkStyle;
      break;
  }

  return (
    <ClickablePrimitive
      {...props}
      className={cx(
        className, 
        linkBaseStyle, 
        isActive && "link-active",
        (icon || variant === "sidebar") && flexRowStyle
      )}
    >
      {icon && <span className={iconWrapperStyle}>{icon}</span>}
      {children && <span className={textWrapperStyle}>{children}</span>}
    </ClickablePrimitive>
  );
}

export default Link;

const linkBaseStyle = css({
  cursor: "pointer",
  textDecoration: "none",
  transition: "all 0.2s ease-in-out",
  fontWeight: "bold",
  fontFamily: "body",

  "&.link-active": {
    pointerEvents: "none",
    cursor: "default",
  },
});

const flexRowStyle = css({
  display: "flex",
  flexDirection: "row", // User insisted on row
  alignItems: "center", // Alignement vertical absolu
  gap: "0.75rem",
  whiteSpace: "nowrap",
});

const iconWrapperStyle = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

const textWrapperStyle = css({
  display: "inline-flex",
  alignItems: "center",
  lineHeight: "1", // Empêche le texte de flotter
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

const sidebarLink = css({
  width: "100%",
  padding: "0.8rem 1.2rem",
  borderRadius: "10px",
  color: "white",
  fontWeight: "500",
  fontSize: "15px",
  "& svg": {
    color: "amcoeurRose", // Icône rose par défaut
    transition: "color 0.2s ease",
  },
  "&:hover": {
    backgroundColor: "rgba(225, 29, 72, 0.1)",
    color: "amcoeurPale",
    "& svg": {
      color: "amcoeurPale",
    },
  },
  "&.link-active": {
    backgroundColor: "amcoeurRose",
    color: "white",
    fontWeight: "600",
    "& svg": {
      color: "white",
    },
  },
});
