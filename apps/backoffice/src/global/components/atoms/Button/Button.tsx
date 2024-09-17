import type { ComponentProps } from "react";
import { css, cx } from "../../../../../styled-system/css";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";
import Icon, { type IconType } from "../Icon/Icon";

type ButtonProps = ComponentProps<typeof ClickablePrimitive> & {
  borderRadius?: "rounded" | "square" | "circle";
  bold?: boolean;
  color?: "green" | "blue" | "red" | "secondary" | "lightGray";
  icon?: IconType;
  isActive?: boolean;
  isDisabled?: boolean;
};

function Button({
  borderRadius,
  bold,
  color,
  children,
  icon,
  isActive,
  isDisabled,
  ...props
}: ButtonProps) {
  const isAnchor = "href" in props || "to" in props;
  const isButton = !isAnchor;

  let borderRadiusStyle = "";
  switch (borderRadius) {
    case "rounded":
      borderRadiusStyle = roundedBorders;
      break;
    case "circle":
      borderRadiusStyle = circleBorders;
      break;
    case "square":
    default:
      borderRadiusStyle = squaredBorders;
      break;
  }

  let colorStyle = "";
  switch (color) {
    case "red":
      colorStyle = redColors;
      break;
    case "blue":
      colorStyle = blueColors;
      break;
    case "green":
      colorStyle = greenColors;
      break;
    case "secondary":
      colorStyle = secondaryColors;
      break;
    case "lightGray":
      colorStyle = lightGray;
      break;
    default:
      colorStyle = primaryColors;
      break;
  }
  const disabledProps = isButton ? { disabled: isDisabled || isActive } : {};
  return (
    <ClickablePrimitive
      {...props}
      className={cx(
        baseButton,
        colorStyle,
        borderRadiusStyle,
        fitContent,
        (isDisabled || isActive) && isAnchor && disabledAnchor,
        !isActive && isDisabledStyle,
        isDisabled && "button-disabled",
        isActive && "button-active",
        bold ? boldText : null,
        icon ? iconPadding : basePadding,
        props.className,
      )}
      {...disabledProps}
    >
      {icon ? <Icon type={icon} /> : children}
    </ClickablePrimitive>
  );
}

export default Button;

const basePadding = css({
  padding: "0.5rem 1rem",
});
const iconPadding = css({
  padding: "8px",
});

const baseButton = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "&:active:not(.button-active):not(.button-disabled)": {
    opacity: "0.8",
  },
  transition: "background-color 0.3s ease",
});

const isDisabledStyle = css({
  "&:disabled": {
    opacity: "0.5",
    cursor: "auto",
  },
});

const greenColors = css({
  color: "white",
  backgroundColor: "green.700",
  "&:hover:not(.button-active):not(.button-disabled)": {
    backgroundColor: "green.100",
    color: "green.700",
  },
  "&:disabled .button-active": {
    cursor: "default",
    backgroundColor: "green.200",
    color: "green.800",
  },
  borderColor: "green.700",
  borderStyle: "solid",
  borderWidth: "2px",
});

const redColors = css({
  color: "white",
  backgroundColor: "red.500",
  "&:hover:not(.button-active):not(.button-disabled)": {
    backgroundColor: "red.100",
    color: "red.400",
  },
  borderColor: "red.500",
  borderStyle: "solid",
  borderWidth: "2px",
});

const blueColors = css({
  color: "blue.50",
  backgroundColor: "blue.500",
  "&:hover:not(.button-active):not(.button-disabled)": {
    backgroundColor: "blue.100",
    color: "blue.500",
  },
  borderColor: "blue.500",
  borderStyle: "solid",
  borderWidth: "2px",
});

const primaryColors = css({
  color: "pink.50",
  backgroundColor: "pink.500",
  "&:hover:not(.button-active):not(.button-disabled)": {
    backgroundColor: "pink.100",
    color: "pink.500",
  },
  borderColor: "pink.500",
  borderStyle: "solid",
  borderWidth: "2px",
});

const secondaryColors = css({
  color: "pink.400",
  backgroundColor: "pink.50",
  "&:hover:not(.button-active):not(.button-disabled)": {
    backgroundColor: "pink.100",
    color: "pink.700",
  },
  "&:disabled.button-active": {
    cursor: "auto",
    backgroundColor: "pink.200",
    color: "pink.800",
  },
  borderColor: "pink.300",
  borderStyle: "solid",
  borderWidth: "2px",
});

const lightGray = css({
  color: "gray.700",
  backgroundColor: "gray.300",
  "&:hover:not(.button-active):not(.button-disabled)": {
    backgroundColor: "gray.400",
    color: "gray.800",
  },
  "&:disabled.button-active": {
    cursor: "default",
    backgroundColor: "gray.500",
    color: "gray.200",
  },
  borderColor: "transparent",
  borderStyle: "solid",
  borderWidth: "1px",
});

const boldText = css({
  fontWeight: "bold",
});

const roundedBorders = css({
  borderRadius: "32px",
});

const squaredBorders = css({
  borderRadius: "4px",
});

const circleBorders = css({
  borderRadius: "50%",
});

const fitContent = css({
  width: "fit-content",
});

const disabledAnchor = css({
  pointerEvents: "none",
});
