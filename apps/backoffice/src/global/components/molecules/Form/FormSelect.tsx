import React, { ComponentProps } from "react";

import Select from "../../atoms/Select/Select";
import Label from "../../atoms/Label/Label";
import { css } from "../../../../../styled-system/css";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";

type FormSelectProps = ComponentProps<typeof Select> & {
  children: React.ReactNode;
  errorMessage?: string;
  size?: "small" | "medium" | "large";
};

/**
 * A form select component that renders a label, select input, and optional error message.
 * @param children - The label text to display.
 * @param size - The size of the select input. Can be "small", "medium", or "large".
 * @param errorMessage - An optional error message to display below the select input.
 * @param props - Additional props to pass to the select input.
 * @returns The rendered form select component.
 */
function FormSelect({
  children,
  size,
  errorMessage,
  ...props
}: FormSelectProps) {
  let sizeClass = fullWidth;
  switch (size) {
    case "small":
      sizeClass = smallSize;
      break;
    case "medium":
      sizeClass = mediumSize;
      break;
    case "large":
      sizeClass = largeSize;
      break;
  }
  return (
    <div>
      <Label>{children}</Label>
      <Select {...props} className={sizeClass} />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
}

export default FormSelect;

const smallSize = css({
  width: "200px",
});

const mediumSize = css({
  width: "300px",
});

const largeSize = css({
  width: "400px",
});

const fullWidth = css({
  width: "100%",
});
