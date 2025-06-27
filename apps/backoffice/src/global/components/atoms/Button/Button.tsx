import type { ComponentProps } from "react";
import {
  css,
  cva,
  cx,
  type RecipeVariantProps,
} from "../../../../../styled-system/css";
import { styled } from "../../../../../styled-system/jsx";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";

const buttonRecipe = cva({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:active:not(.button-active):not(.button-disabled)": {
      opacity: "0.8",
    },
    transition: "background-color 0.3s ease",
    padding: "0.5rem 1rem",
    width: "fit-content",
  },
  variants: {
    color: {
      green: {
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
      },
      red: {
        color: "white",
        backgroundColor: "red.400",
        "&:hover:not(.button-active):not(.button-disabled)": {
          backgroundColor: "red.100",
          color: "red.400",
        },
        borderColor: "red.400",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      blue: {
        color: "blue.50",
        backgroundColor: "blue.500",
        "&:hover:not(.button-active):not(.button-disabled)": {
          backgroundColor: "blue.100",
          color: "blue.500",
        },
        borderColor: "blue.500",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      primary: {
        color: "pink.50",
        backgroundColor: "pink.500",
        "&:hover:not(.button-active):not(.button-disabled)": {
          backgroundColor: "pink.100",
          color: "pink.500",
        },
        borderColor: "pink.500",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      secondary: {
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
      },
      lightgray: {
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
      },
    },
    borders: {
      rounded: {
        borderRadius: "32px",
      },

      squared: {
        borderRadius: "4px",
      },

      circle: {
        borderRadius: "50%",
      },
    },
    isIcon: {
      true: {
        padding: "8px",
      },
    },
  },
  defaultVariants: {
    borders: "squared",
    color: "primary",
  },
});

const StyledButton = styled(ClickablePrimitive, buttonRecipe);

type ButtonProps = ComponentProps<typeof StyledButton> & {
  isActive?: boolean;
  isDisabled?: boolean;
};

function Button({ isActive, isDisabled, ...props }: ButtonProps) {
  const isAnchor = "href" in props || "to" in props;
  const isButton = !isAnchor;

  const disabledProps = isButton ? { disabled: isDisabled || isActive } : {};
  return (
    <StyledButton
      {...props}
      className={cx(
        (isDisabled || isActive) && isAnchor && disabledAnchor,
        !isActive && isDisabledStyle,
        isDisabled && "button-disabled",
        isActive && "button-active",
        props.className,
      )}
      {...disabledProps}
    />
  );
}

export default Button;

const isDisabledStyle = css({
  "&:disabled": {
    opacity: "0.5",
    cursor: "auto",
  },
});

const disabledAnchor = css({
  pointerEvents: "none",
});
