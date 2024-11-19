import { ComponentPropsWithoutRef,forwardRef } from "react";

import { css, cx } from "../../../../../styled-system/css";

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "children" | "type"
> & {
  type: "radio" | "checkbox";
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    return (
      <input {...props} ref={ref} className={cx(inputStyle, props.className)} />
    );
  },
);

export default Checkbox;

const inputStyle = css({
  width: "1.5rem",
  height: "1.5rem",
});
