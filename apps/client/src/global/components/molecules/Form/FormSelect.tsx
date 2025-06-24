import React, { ComponentProps, forwardRef } from "react";

import { css } from "../../../../../styled-system/css";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Label from "../../atoms/Label/Label";
import Select from "../../atoms/Select/Select";

type FormSelectProps = ComponentProps<typeof Select> & {
  children: React.ReactNode;
  errorMessage?: string;
  inputSize?: "small" | "medium" | "large";
};

/**
 * A form select component that renders a label, select input, and optional error message.
 * @param children - The label text to display.
 * @param size - The size of the select input. Can be "small", "medium", or "large".
 * @param errorMessage - An optional error message to display below the select input.
 * @param props - Additional props to pass to the select input.
 * @returns The rendered form select component.
 */
const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  function FormSelect(
    { children, inputSize, errorMessage, ...props }: FormSelectProps,
    ref,
  ) {
    let sizeClass = fullWidth;
    switch (inputSize) {
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
        <Select {...props} ref={ref} className={sizeClass} />
        {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
      </div>
    );
  },
);
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
