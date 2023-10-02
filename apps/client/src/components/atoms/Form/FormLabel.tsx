import { css } from "../../../../styled-system/css";

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: string;
};

export default function FormLabel({ children, ...props }: FormLabelProps) {
  return <label {...props}>{children}</label>;
}
