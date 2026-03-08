import { Loader2 } from "lucide-react";

import { css } from "../../../../../styled-system/css";

type SpinnerProps = {
  size?: number | string;
  color?: string;
};

function Spinner({ size = 48, color }: SpinnerProps) {
  return (
    <div className={containerStyle}>
      <Loader2 
        size={size} 
        color={color || "#e11d48"} // rose.600 par défaut
        className={spinnerStyle} 
      />
    </div>
  );
}

const containerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
});

const spinnerStyle = css({
  animation: "spin 1s linear infinite",
});

export default Spinner;
