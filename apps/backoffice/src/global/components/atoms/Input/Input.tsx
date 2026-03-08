import { ComponentPropsWithoutRef, forwardRef } from "react";

import { css, cx } from "../../../../../styled-system/css";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "children"> & {
  isPath?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isPath, ...restProps } = props;

  let typeStyle;
  switch (props.type) {
    case "file":
      typeStyle = fileStyle;
      break;

    default:
      break;
  }

  const renderedInput = (
    <input
      {...restProps}
      ref={ref}
      className={cx(
        isPath ? pathInput : inputStyle,
        typeStyle,
        props.className,
      )}
    />
  );

  return isPath ? (
    <div className={pathContainer}>
      <div>/</div>
      {renderedInput}
    </div>
  ) : (
    renderedInput
  );
});

export default Input;

const inputStyle = css({
  backgroundColor: "transparent",
  borderBottom: "2px solid",
  borderColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "0",
  padding: "0.75rem 0.25rem",
  color: "white",
  outline: "none",
  transition: "all 0.3s ease",
  width: "100%",

  "&:focus": {
    borderColor: "amcoeurRose",
    backgroundColor: "rgba(225, 29, 72, 0.05)",
  },

  "&::placeholder": {
    color: "rgba(255, 255, 255, 0.4)",
  },

  "&::file-selector-button": {
    backgroundColor: "amcoeurRose",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    marginRight: "12px",
    cursor: "pointer",
    color: "white",
    fontSize: "xs",
    fontWeight: "bold",
    transition: "background 0.2s",
    "&:hover": {
      backgroundColor: "amcoeurPale",
    },
  },
});

const pathInput = css({
  padding: "0.75rem 0.5rem",
  borderBottom: "2px solid",
  borderColor: "rgba(255, 255, 255, 0.2)",
  backgroundColor: "transparent",
  color: "white",
  outline: "none",
  flex: 1,
  
  "&:focus": {
    borderColor: "amcoeurRose",
  },

  _disabled: { color: "gray.500" },
});

const pathContainer = css({
  display: "flex",
  alignItems: "center",
  width: "100%",
  "& div": {
    height: "100%",
    padding: "0 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "amcoeurRose",
    fontWeight: "bold",
    fontSize: "lg",
  },
});

const fileStyle = css({
  color: "white",
  borderBottom: "none!", // Pas de bordure pour l'input file, le bouton suffit
});
