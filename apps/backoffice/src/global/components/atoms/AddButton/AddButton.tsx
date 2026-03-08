import { Plus } from "lucide-react";

import { css } from "../../../../../styled-system/css";

export const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={containerStyle}>
      <button
        type="button"
        onClick={onClick}
        className={circleButtonStyle}
        title="Ajouter un composant"
      >
        <Plus size={40} strokeWidth={1.5} className={iconStyle} />
      </button>
      <div className={labelStyle}>Ajouter un élément</div>
    </div>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  padding: "2rem",
  width: "100%",
  margin: "1rem 0",
});

const circleButtonStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80px",
  height: "80px",
  borderRadius: "full",
  backgroundColor: "transparent",
  border: "2px dashed",
  borderColor: "rgba(225, 29, 72, 0.4)", // amcoeurRose translucide
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  outline: "none",
  position: "relative",

  "&:hover": {
    backgroundColor: "rgba(225, 29, 72, 0.1)",
    borderColor: "amcoeurRose",
    boxShadow: "0 0 20px rgba(225, 29, 72, 0.3)",
    transform: "scale(1.05)",
    
    "& svg": {
      color: "amcoeurRose",
      transform: "rotate(90deg)",
    }
  },

  "&:active": {
    transform: "scale(0.95)",
  }
});

const iconStyle = css({
  color: "rgba(255, 255, 255, 0.4)",
  transition: "all 0.4s ease",
});

const labelStyle = css({
  fontSize: "xs",
  fontWeight: "bold",
  color: "amcoeurPale",
  textTransform: "uppercase",
  letterSpacing: "wider",
  opacity: 0.6,
  transition: "opacity 0.3s",

  "div:hover + &": {
    opacity: 1,
  }
});
