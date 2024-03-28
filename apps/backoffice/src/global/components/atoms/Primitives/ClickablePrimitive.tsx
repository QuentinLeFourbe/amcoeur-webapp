import type { ComponentProps } from "react";

import { Link } from "react-router-dom";

type AnchorProps = ComponentProps<"a"> & {
  href: string;
};
type ButtonProps = ComponentProps<"button"> & {
  href?: undefined;
};
type LinkProps = ComponentProps<typeof Link> & {
  href?: undefined;
};

type ClickablePrimitiveProps = AnchorProps | LinkProps | ButtonProps;

export const ClickablePrimitive = function renderButtonPrimitive(
  props: ClickablePrimitiveProps
) {
  if (props.href !== undefined) {
    return <a {...props} />;
  }

  if ("to" in props) {
    return <Link {...props} />;
  }

  return <button {...props} />;
};
