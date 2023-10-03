import { css } from "../../../../styled-system/css";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;

function FormInput(props: FormInputProps) {
  return <input className={inputStyle} {...props} />;
}

export default FormInput;

const inputStyle = css({
  display: "flex",
  justifyContent: "flex-start",
  fontSize: "20px",
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  padding: "10px",
  width: "100%",
});