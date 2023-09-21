import React from "react";
import { Link as RouterLink } from "react-router-dom";
import type { LinkProps as RouterLinkProps } from "react-router-dom";
import { css, cx } from "../../../../styled-system/css";

type LinkProps = React.PropsWithoutRef<RouterLinkProps> & {
  secondary?: boolean;
};

/**
 * A custom link which uses React router's Link component.
 */
function Link({ children, secondary = false, ...props }: LinkProps) {
  return (
    <RouterLink
      {...props}
      className={cx(
        linkStyle,
        secondary ? linkSecondaryColor : linkPrimaryColor
      )}
    >
      {children}
    </RouterLink>
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

const linkPrimaryColor = css({
  color: "textPrimary",
  "&:hover": {
    color: "textSecondary",
  },
});

const linkSecondaryColor = css({
  color: "textSecondary",
  "&:hover": {
    color: "textPrimary",
  },
});
