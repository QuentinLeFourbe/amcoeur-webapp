import type { ComponentProps } from "react";
import { css, cx } from "../../../../styled-system/css";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";

type ButtonProps = ComponentProps<typeof ClickablePrimitive> & {
  rounded?: boolean;
  bold?: boolean;
  size?: "small" | "medium" | "large";
};

function Button({ rounded, bold, ...props }: ButtonProps) {
  return (
    <ClickablePrimitive
      {...props}
      className={cx(
        baseButton,
        primaryColors,
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

const primaryColors = css({
  color: "textSecondary",
  backgroundColor: "buttons.primary.background",
  "&:hover": {
    backgroundColor: "buttons.primary.backgroundHover",
    color: "buttons.primary.textHover",
  },
  borderColor: "buttons.primary.background",
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
