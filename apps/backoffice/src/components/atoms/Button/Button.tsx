import type { ComponentProps } from "react";
import { css, cx } from "../../../../styled-system/css";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";

type ButtonProps = ComponentProps<typeof ClickablePrimitive> & {
  rounded?: boolean;
  bold?: boolean;
  size?: "small" | "medium" | "large";
  color?: "green" | "blue" | "red" | "secondary";
};

function Button({ rounded, bold, color, ...props }: ButtonProps) {
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
        rounded ? roundedBorders : squaredBorders,
        bold ? boldText : null,
        fitContent,
        props.className,
      )}
    />
  );
}

export default Button;

const baseButton = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  padding: "0.5rem 1rem",
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

const fitContent = css({
  width: "fit-content",
});
