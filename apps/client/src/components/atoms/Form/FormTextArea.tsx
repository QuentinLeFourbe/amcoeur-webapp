import { css } from "../../../../styled-system/css";

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

function FormTextArea(props: FormTextAreaProps) {
  return <textarea className={textAreaStyle} {...props} />;
}

export default FormTextArea;

const textAreaStyle = css({});
