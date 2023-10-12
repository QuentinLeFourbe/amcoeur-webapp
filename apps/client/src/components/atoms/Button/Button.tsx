import React from "react";
import { css, cx } from "../../../../styled-system/css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={cx(borderStyle, buttonStyle)} {...props}>
      {children}
    </button>
  );
}

export default Button;

const buttonStyle = css({
  backgroundColor: "buttons.primary.background",
  color: "textSecondary",

  padding: "10px 40px",
  transition: "background-color 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "buttons.primary.backgroundHover",
    color: "buttons.primary.textHover",
  },
  "&:active": {
    opacity: "0.8",
  },
});

const borderStyle = css({
  borderColor: "buttons.primary.background",
  borderStyle: "solid",
  borderWidth: "2px",
  borderRadius: "4px",
});
