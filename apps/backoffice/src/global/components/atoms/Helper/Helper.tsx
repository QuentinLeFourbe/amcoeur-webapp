import { ChevronDown, ChevronUp,HelpCircle } from "lucide-react";
import { ComponentProps, type ReactNode, useState } from "react";

import { css, cx } from "../../../../../styled-system/css";

type HelperProps = ComponentProps<"div"> & {
  children: ReactNode;
  label: string;
};

function Helper({ children, label, ...props }: HelperProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div {...props} className={cx(container, props.className)}>
      <button
        className={cx(buttonStyle, showDetails && activeButtonStyle)}
        type="button"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem" })}>
          <HelpCircle size={18} className={css({ color: "amcoeurRose" })} />
          <span>{label}</span>
        </div>
        {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {showDetails && (
        <div className={textContainer}>
          <div className={innerContentStyle}>{children}</div>
        </div>
      )}
    </div>
  );
}

export default Helper;

const container = css({
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  borderRadius: "12px",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.05)",
  width: "100%",
  overflow: "hidden",
  transition: "all 0.3s ease",
});

const buttonStyle = css({
  fontSize: "sm",
  fontWeight: "bold",
  color: "amcoeurPale",
  backgroundColor: "transparent",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
  padding: "0.75rem 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "none",
  outline: "none",
  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "white",
  },
});

const activeButtonStyle = css({
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
});

const textContainer = css({
  width: "100%",
  color: "rgba(255, 255, 255, 0.8)",
  fontSize: "0.85rem",
  lineHeight: "relaxed",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
});

const innerContentStyle = css({
  padding: "1rem 1.25rem",
  
  "& p": {
    margin: "0.5rem 0",
  },

  "& ul": {
    listStyle: "none",
    padding: 0,
    margin: "1rem 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "0.5rem",
  },

  "& li": {
    padding: "0.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "6px",
    fontSize: "xs",
    fontFamily: "monospace",
    color: "amcoeurPale",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  }
});
