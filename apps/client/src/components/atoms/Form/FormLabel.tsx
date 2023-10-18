import { css } from "../../../../styled-system/css";

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

export default function FormLabel({ children, ...props }: FormLabelProps) {
  return (
    <label className={labelStyle} {...props}>
      {children}
    </label>
  );
}

const labelStyle = css({
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  marginBottom: "0.5rem",
});
