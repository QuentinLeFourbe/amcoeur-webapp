import React from "react";
import { Link as GatsbyLink } from "gatsby";
import type { GatsbyLinkProps } from "gatsby";
import { css, cx } from "../../../../styled-system/css";

type LinkProps<TState> = React.PropsWithoutRef<GatsbyLinkProps<TState>> & {
  secondary?: boolean;
};

/**
 * A custom link which uses Gatsby's Link component.
 */
function Link<TState>({
  children,
  secondary = false,
  ...props
}: LinkProps<TState>) {
  return (
    <GatsbyLink
      {...props}
      className={cx(
        linkStyle,
        secondary ? linkSecondaryColor : linkPrimaryColor
      )}
    >
      {children}
    </GatsbyLink>
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
