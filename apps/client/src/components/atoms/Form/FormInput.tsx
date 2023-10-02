import React from "react";
import { css } from "../../../../styled-system/css";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;

function FormInput(props: FormInputProps) {
  return <input className={inputStyle} {...props} />;
}

export default FormInput;

const inputStyle = css({
  display: "flex",
  justifyContent: "flex-start",
  fontSize: "500px",
});
