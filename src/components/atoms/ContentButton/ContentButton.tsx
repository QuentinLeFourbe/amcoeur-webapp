import React from "react";
import { css } from "../../../../styled-system/css";

type ContentButtonProps = {
  children: React.ReactNode;
};

function ContentButton({ children }: ContentButtonProps) {
  return <button className={button}>{children}</button>;
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
});

export default ContentButton;
