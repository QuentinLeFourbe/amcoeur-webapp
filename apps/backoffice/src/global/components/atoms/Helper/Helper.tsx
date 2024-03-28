import { useState, type ReactNode, ComponentProps } from "react";
import { css, cx } from "../../../../../styled-system/css";

type HelperProps = ComponentProps<"div"> & {
  children: ReactNode;
  label: string;
};

function Helper({ children, label , ...props}: HelperProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div {...props} className={cx(container, props.className)}>
      <button
        className={buttonStyle}
        type="button"
        onClick={() => setShowDetails(!showDetails)}
      >
        {label}
      </button>
      {showDetails && <div className={textContainer}>{children}</div>}
    </div>
  );
}

export default Helper;

const container = css({
  backgroundColor: "blue.900",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const textContainer = css({
  width:"100%",
  color: "white",
  padding: "0rem 1rem",
  fontSize: "0.9rem",
  whiteSpace: "pre-wrap",
  "& p": {
    margin: "0.5rem 0",
  },

  "& ul": {
    listStyle: "square",
    marginLeft: "1rem",
  },
});

const buttonStyle = css({
  fontSize: "1.2rem",
  fontWeight: "600",
  color: "white",
  backgroundColor: "blue.900",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
  padding: "1rem",

  "&:hover": {
    backgroundColor: "blue.800",
  },
});
