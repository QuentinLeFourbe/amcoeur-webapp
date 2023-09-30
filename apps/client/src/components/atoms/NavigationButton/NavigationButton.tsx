import React from "react";
import { css } from "../../../../styled-system/css";

type NavigationButtonProps = {
  children: React.ReactNode;
  href?: string;
};

function NavigationButton({ children, href = "#" }: NavigationButtonProps) {
  return (
    <a href={href} className={button}>
      {children}
    </a>
  );
}

const button = css({
  alignSelf: "flex-start",
  borderRadius: "10px",
  backgroundColor: "buttonPrimary",
  padding: "20px 50px",
  margin: "40px 0 0 0",
  color: "textSecondary",
  fontWeight: "500",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "buttonPrimaryHover",
  },
  transition: "background-color 0.2s ease-in-out",
});

export default NavigationButton;
