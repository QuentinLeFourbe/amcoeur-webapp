import React from "react";
import { Link } from "react-router-dom";
import { css } from "../../../../styled-system/css";

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
  backgroundColor: "buttons.primary.background",
  color: "buttons.primary.text",
  padding: "20px 40px",
  margin: "40px 0 0 0",
  fontWeight: "500",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "buttons.primary.backgroundHover",
  },
  "&:active": {
    backgroundColor: "buttons.primary.backgroundActive",
  },
  transition: "background-color 0.2s ease-in-out",
});

export default ContentButton;
