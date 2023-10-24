import { forwardRef, ComponentPropsWithoutRef } from "react";
import { css, cx } from "../../../../styled-system/css";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "children">;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input {...props} ref={ref} className={cx(inputStyle, props.className)} />
  );
});

Input.displayName = "Input";
export default Input;

const inputStyle = css({
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  padding: "1rem",
});
