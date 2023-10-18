import React from "react";
import { css } from "../../../../styled-system/css";
import { ClickablePrimitive } from "../Primitives/ClickablePrimitive";

type NavigationButtonProps = {
  children: React.ReactNode;
  href?: string;
};

function NavigationButton({ children, href = "#" }: NavigationButtonProps) {
  return (
    <ClickablePrimitive href={href} className={button}>
      {children}
    </ClickablePrimitive>
  );
}

const button = css({
  alignSelf: "flex-start",
  borderRadius: "10px",
  backgroundColor: "buttons.primary.background",
  color: "buttons.primary.text",
  padding: "20px 50px",
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

export default NavigationButton;
