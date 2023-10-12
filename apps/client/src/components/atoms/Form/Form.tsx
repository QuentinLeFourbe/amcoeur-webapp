import { css } from "../../../../styled-system/css";

type FormProps = React.HTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
};

export default function Form({ children, ...props }: FormProps) {
  return (
    <form className={formContainer} {...props}>
      {children}
    </form>
  );
}
const formContainer = css({
  display: "flex",
  justifyContent: "center",
  flexFlow: "column wrap",
  gap: "10px",
  alignItems: "center",
});
