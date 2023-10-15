import type {
  ComponentProps,
  ForwardedRef,
  ReactElement,
  ReactNode,
} from "react";

import { forwardRef } from "react";
import { Link } from "react-router-dom";

type AnchorRef = ForwardedRef<HTMLAnchorElement | undefined>;
type ButtonRef = ForwardedRef<HTMLButtonElement | undefined>;
type MixedRef = ForwardedRef<HTMLAnchorElement & HTMLButtonElement>;

type AnchorProps = Omit<ComponentProps<"a">, "ref"> & {
  href: string;
  ref?: AnchorRef | MixedRef | undefined;
};
type ButtonProps = Omit<ComponentProps<"button">, "ref"> & {
  href?: undefined;
  ref?: ButtonRef | MixedRef | undefined;
};
type LinkProps = Omit<ComponentProps<typeof Link>, "href" | "ref"> & {
  href?: undefined;
  ref?: AnchorRef | MixedRef | undefined;
};

type ButtonPrimitiveProps = AnchorProps | ButtonProps | LinkProps;

export const ClickablePrimitive = forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  ButtonPrimitiveProps
>(function renderButtonPrimitive(props, ref) {
  if (props.href !== undefined) {
    return <a {...props} ref={ref} />;
  }

  if ("to" in props) {
    return <Link {...props} ref={ref} />;
  }

  return <button {...props} ref={ref} />;
}) as {
  (props: AnchorProps): ReactElement<AnchorProps, "a">;
  (props: ButtonProps): ReactElement<ButtonProps, "button">;
  (props: LinkProps): ReactNode;
};
