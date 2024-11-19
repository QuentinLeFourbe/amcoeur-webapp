import type { ComponentProps } from "react";
import { RecipeVariantProps, cva, cx } from "../../../../../styled-system/css";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";
import Icon, { type IconType } from "../Icon/Icon";

const buttonRecipe = cva({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    cursor: "pointer",
    "&:active:not([data-active], [data-disabled])": {
      opacity: "0.8",
    },
    transition: "background-color 0.3s ease",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    "&is([data-disabled])": {
      opacity: "0.5",
      cursor: "auto",
    },
  },
  variants: {
    color: {
      primary: {
        color: "pink.50",
        backgroundColor: "pink.500",
        "&:hover:not([data-active],[data-disabled])": {
          backgroundColor: "pink.100",
          color: "pink.500",
        },
        _active: {
          backgroundColor: "pink.100",
          color: "pink.500",
          cursor: "auto",
        },
        borderColor: "pink.500",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      secondary: {
        color: "pink.400",
        backgroundColor: "pink.50",
        "&:hover:not([data-active],[data-disabled])": {
          backgroundColor: "pink.100",
          color: "pink.700",
        },
        "&is([data-disabled],[data-active])": {
          cursor: "auto",
          backgroundColor: "pink.200",
          color: "pink.800",
        },
        borderColor: "pink.300",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      danger: {
        color: "white",
        backgroundColor: "red.500",
        "&:hover:not([data-active],[data-disabled])": {
          backgroundColor: "red.100",
          color: "red.400",
        },
        borderColor: "red.500",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      info: {
        color: "blue.50",
        backgroundColor: "blue.500",
        "&:hover:not([data-active]):not(.[data-disabled])": {
          backgroundColor: "blue.100",
          color: "blue.500",
        },
        borderColor: "blue.500",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      success: {
        color: "white",
        backgroundColor: "green.700",
        "&:hover:not([data-active],[data-disabled])": {
          backgroundColor: "green.100",
          color: "green.700",
        },
        "&is([data-disabled], [data-active])": {
          cursor: "default",
          backgroundColor: "green.200",
          color: "green.800",
        },
        borderColor: "green.700",
        borderStyle: "solid",
        borderWidth: "2px",
      },
    },
    bold: {
      true: {
        fontWeight: "bold",
      },
    },
    borderRadius: {
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

export type ButtonVariants = RecipeVariantProps<typeof buttonRecipe>;

type ButtonProps = ComponentProps<typeof ClickablePrimitive> & {
  variants?: ButtonVariants;
  icon?: IconType;
  active?: boolean;
  disabled?: boolean;
};

function Button({
  variants,
  children,
  icon,
  active,
  disabled,
  ...props
}: ButtonProps) {
  const isAnchor = "href" in props || "to" in props;
  const isButton = !isAnchor;

  const disabledProps = isButton ? { disabled: disabled || active } : {};

  return (
    <ClickablePrimitive
      {...props}
      className={cx(
        buttonRecipe({
          ...variants,
          icon: !!icon,
          disabledAnchor: (disabled || active) && isAnchor,
        }),
        props.className,
      )}
      data-active={active ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      {...disabledProps}
    >
      {icon ? <Icon type={icon} /> : children}
    </ClickablePrimitive>
  );
}

export default Button;
