import type { ComponentProps } from "react";
import { css, cx } from "../../../../../styled-system/css";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";
import Icon, { type IconType } from "../Icon/Icon";

type ButtonProps = ComponentProps<typeof ClickablePrimitive> & {
  borderRadius?: "rounded" | "square" | "circle";
  bold?: boolean;
  size?: "small" | "medium" | "large";
  color?: "green" | "blue" | "red" | "secondary";
  icon?: IconType;
};

function Button({
  borderRadius,
  bold,
  color,
  children,
  icon,
  ...props
}: ButtonProps) {
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
    default:
      colorStyle = primaryColors;
      break;
  }

  return (
    <ClickablePrimitive
      {...props}
      className={cx(
        baseButton,
        colorStyle,
        borderRadiusStyle,
        bold ? boldText : null,
        fitContent,
        icon ? iconPadding : basePadding,
        props.className,
      )}
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
  "&:active": {
    opacity: "0.8",
  },
  transition: "background-color 0.3s ease",
});

const greenColors = css({
  color: "white",
  backgroundColor: "green.700",
  "&:hover": {
    backgroundColor: "green.100",
    color: "green.700",
  },
  borderColor: "green.700",
  borderStyle: "solid",
  borderWidth: "2px",
});

const redColors = css({
  color: "white",
  backgroundColor: "red.400",
  "&:hover": {
    backgroundColor: "red.100",
    color: "red.400",
  },
  borderColor: "red.400",
  borderStyle: "solid",
  borderWidth: "2px",
});

const blueColors = css({
  color: "blue.50",
  backgroundColor: "blue.500",
  "&:hover": {
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
  "&:hover": {
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
  "&:hover": {
    backgroundColor: "pink.100",
    color: "pink.700",
  },
  borderColor: "pink.300",
  borderStyle: "solid",
  borderWidth: "2px",
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
