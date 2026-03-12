import type { ComponentProps } from "react";

import { cva } from "../../../../../styled-system/css";
import { styled } from "../../../../../styled-system/jsx";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";
import Spinner from "../Spinner/Spinner";

const buttonRecipe = cva({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: "0.6rem 1.2rem",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "sm",
    border: "1px solid transparent",
    outline: "none",

    "&:active:not([data-active], [data-disabled])": {
      transform: "scale(0.96)",
    },
    
    "&:is([data-disabled])": {
      opacity: "0.4",
      cursor: "not-allowed",
      filter: "grayscale(0.5)",
    },
  },
  variants: {
    color: {
      primary: {
        color: "white",
        backgroundColor: "amcoeurRose",
        "&:hover:not([data-active],[data-disabled])": {
          backgroundColor: "amcoeurPale",
          boxShadow: "0 4px 15px rgba(225, 29, 72, 0.3)",
        },
      },
      secondary: {
        color: "white",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        "&:hover:not([data-active],[data-disabled])": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "amcoeurPale",
        },
      },
      danger: {
        color: "white",
        backgroundColor: "#ef4444", // red.500
        "&:hover:not([data-active],[data-disabled])": {
          backgroundColor: "#f87171",
          boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
        },
      },
      info: {
        color: "white",
        backgroundColor: "#3b82f6", // blue.500
        "&:hover:not([data-active],[data-disabled])": {
          backgroundColor: "#60a5fa",
          boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
        },
      },
      success: {
        color: "white",
        backgroundColor: "#10b981", // emerald.500
        "&:hover:not([data-active],[data-disabled])": {
          backgroundColor: "#34d399",
          boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
          transform: "translateY(-1px)",
        },
        "&is([data-disabled], [data-active])": {
          backgroundColor: "#064e3b",
          color: "rgba(255,255,255,0.5)",
        },
      },
    },
    bold: {
      true: {
        fontWeight: "bold",
      },
    },
    borders: {
      circle: {
        borderRadius: "50%",
      },
      roundedBorders: {
        borderRadius: "32px",
      },
    },
    icon: {
      true: {
        padding: "8px",
      },
    },
    disabledAnchor: {
      true: {
        pointerEvents: "none",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

const StyledButton = styled(ClickablePrimitive, buttonRecipe);

type ButtonProps = ComponentProps<typeof StyledButton> & {
  active?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
};

function Button({ active, disabled, isLoading, ...props }: ButtonProps) {
  const isAnchor = "href" in props || "to" in props;
  const isButton = !isAnchor;

  const isDisabled = disabled || active || isLoading;
  const disabledProps = isButton ? { disabled: isDisabled } : {};

  return (
    <StyledButton
      {...props}
      data-active={active ? "true" : undefined}
      data-disabled={isDisabled ? "true" : undefined}
      disabledAnchor={isDisabled && isAnchor}
      {...disabledProps}
    >
      {isLoading && <Spinner size={18} color="currentColor" inline />}
      {props.children}
    </StyledButton>
  );
}

export default Button;
