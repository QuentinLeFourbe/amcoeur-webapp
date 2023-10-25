import { forwardRef, ComponentPropsWithoutRef } from "react";
import { css, cx } from "../../../../styled-system/css";

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "children" | "type"
>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return (
    <input
      {...props}
      type="checkbox"
      ref={ref}
      className={cx(inputStyle, props.className)}
    />
  );
});

export default Checkbox;

const inputStyle = css({
  width: "1.5rem",
  height: "1.5rem",
});
