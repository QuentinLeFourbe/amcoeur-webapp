import { css } from "../../../../styled-system/css";

type FormProps = React.HTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  column?: boolean;
};

export default function Form({ children, column, ...props }: FormProps) {
  return (
    <form className={column ? columnStyle : formContainer} {...props}>
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

const columnStyle = css({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "2rem",
  margin: "5vh 20vw",
});
