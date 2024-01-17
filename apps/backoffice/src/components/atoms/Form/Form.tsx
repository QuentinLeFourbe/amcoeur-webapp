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
  flexFlow: "column nowrap",
  maxWidth: "100%",
  justifyItems: "stretch",
  gap: "2rem",
});
