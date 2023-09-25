import React from "react";
import { css } from "../../../../styled-system/css";
import { Link } from "react-router-dom";

type ContentButtonProps = {
  children: React.ReactNode;
  href?: string;
};

function ContentButton({ children, href = "" }: ContentButtonProps) {
  return (
    <button className={button}>
      <Link to={href}>{children}</Link>
    </button>
  );
}

const button = css({
  alignSelf: "flex-start",
  borderRadius: "32px",
  backgroundColor: "buttonPrimary",
  padding: "20px 40px",
  margin: "40px 0 0 0",
  color: "textSecondary",
  fontWeight: "500",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "buttonPrimaryHover",
  },
  transition: "background-color 0.2s ease-in-out",
});

export default ContentButton;
