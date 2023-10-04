import React from 'react';
import { css } from "../../../../styled-system/css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  rounded?: boolean;
  inverted?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, rounded, inverted, ...rest }) => {
  const buttonClass = custom-button ${rounded ? 'rounded' : ''} ${inverted ? 'inverted' : ''};

  return (
    <button className={buttonClass} {...rest}>
      {label}
    </button>
  );
};

export default Button;