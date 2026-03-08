import React from "react";

import { css } from "../../../../../styled-system/css";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Label from "../../atoms/Label/Label";
import Select from "../../atoms/Select/Select";

type FormSelectProps = {
  children: React.ReactNode;
  errorMessage?: string;
  inputSize?: "small" | "medium" | "large";
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  name?: string;
  placeholder?: string;
};

/**
 * A form select component that renders a label, custom select input, and optional error message.
 */
const FormSelect = ({ 
  children, 
  errorMessage, 
  inputSize, 
  options, 
  value, 
  onChange, 
  onBlur,
  name,
  placeholder
}: FormSelectProps) => {
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
      <Label htmlFor={name}>{children}</Label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={sizeClass}
      />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
};

export default FormSelect;

const container = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  width: "100%",
});

const smallSize = css({
  maxWidth: "200px",
});

const mediumSize = css({
  maxWidth: "400px",
});

const largeSize = css({
  maxWidth: "600px",
});

const fullWidth = css({
  width: "100%",
});
