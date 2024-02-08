import { forwardRef, ComponentPropsWithoutRef } from "react";
import { css, cx } from "../../../../styled-system/css";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "children"> & {
  isPath?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isPath, type, ...restProps } = props;

  let inputStyle;
  switch (type) {
    case "file":
      inputStyle = inputFileStyle;
      break;
    default:
      inputStyle = inputTextStyle;
  }

  const renderedInput = (
    <input
      {...restProps}
      ref={ref}
      className={cx(isPath ? pathInput : inputStyle, props.className)}
      type={type || "text"}
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

Input.displayName = "Input";
export default Input;

const inputTextStyle = css({
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  padding: "1rem",
});

const inputFileStyle = css({
  padding: "1rem",
  borderRadius: "4px",
  backgroundColor: "backgrounds.primary.extraLight",
  color: "gray.800",
});

const pathInput = css({
  padding: "1rem",
  borderRadius: "0 4px 4px 0",
  borderLeft: "none",
});

const pathContainer = css({
  display: "flex",
  alignItems: "center",
  "& div": {
    height: "100%",
    width: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color: "black",
    backgroundColor: "gray.50",

    borderColor: "gray.300",
    borderStyle: "solid",
    borderRadius: "4px 0 0 4px",
    borderWidth: "1px",
  },
});
