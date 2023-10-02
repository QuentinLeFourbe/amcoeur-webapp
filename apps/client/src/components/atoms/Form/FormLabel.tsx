import { css } from "../../../../styled-system/css";

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: string;
};

export default function FormLabel({ children, ...props }: FormLabelProps) {
  return (
    <label className={labelStyle} {...props}>
      {children}
    </label>
  );
}

const labelStyle = css({});
