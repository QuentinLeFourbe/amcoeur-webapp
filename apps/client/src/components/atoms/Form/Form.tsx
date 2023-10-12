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
  display: "grid",
  maxWidth: "100%",
  margin: "5vh 20vw",
  gridTemplateColumns: "1fr 1fr",
  justifyItems: "stretch",
  gap: "2rem",
});
