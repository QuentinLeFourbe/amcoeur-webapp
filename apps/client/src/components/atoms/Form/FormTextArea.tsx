import { css } from "../../../../styled-system/css";

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

function FormTextArea(props: FormTextAreaProps) {
  return <textarea className={textAreaStyle} {...props} />;
}

export default FormTextArea;

const textAreaStyle = css({
  display: "flex",
  justifyContent: "flex-start",
  fontSize: "22px",
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "50%",
});
