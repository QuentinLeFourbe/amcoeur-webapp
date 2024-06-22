import React, { ComponentPropsWithRef, forwardRef } from "react";
import Label from "../../atoms/Label/Label";
import { css } from "../../../../../styled-system/css";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import SelectAlt from "../../atoms/Select/SelectAlt";

type FormSelectProps = ComponentPropsWithRef<typeof SelectAlt> & {
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
  function FormSelect({ children, errorMessage, inputSize, ...props }, ref) {
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
      <div className={container}>
        <Label htmlFor={props.name}>{children}</Label>
        <SelectAlt {...props} className={sizeClass} ref={ref} />
        {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
      </div>
    );
  },
);

export default FormSelect;

const container = css({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "8px",
});

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
