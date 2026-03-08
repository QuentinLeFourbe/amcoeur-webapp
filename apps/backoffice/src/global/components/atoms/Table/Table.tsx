import { ComponentProps } from "react";
import { css, cx } from "../../../../../styled-system/css";

type TableProps = ComponentProps<"table">;

function Table(props: TableProps) {
  return (
    <div className={wrapperStyle}>
      <table {...props} className={cx(tableStyle, props.className)} />
    </div>
  );
}

export default Table;

const wrapperStyle = css({
  width: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.05)",
});

const tableStyle = css({
  width: "100%",
  borderCollapse: "collapse",
  
  "& thead": {
    backgroundColor: "amcoeurRose", // Le rose Amcoeur pour que ça ressorte fort
    borderBottom: "4px solid",
    borderColor: "rgba(0, 0, 0, 0.2)", // Petite ombre sous le header
  },

  "& th": {
    padding: "1.25rem 1.5rem",
    textAlign: "left",
    color: "white",
    fontSize: "sm",
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },

  "& td": {
    padding: "1.25rem 1.5rem",
    textAlign: "left",
    color: "white",
    fontSize: "15px",
    borderBottom: "1px solid",
    borderColor: "rgba(255, 255, 255, 0.05)",
  },

  "& tr:last-child td": {
    borderBottom: "none",
  },

  "& tr:hover td": {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  }
});
