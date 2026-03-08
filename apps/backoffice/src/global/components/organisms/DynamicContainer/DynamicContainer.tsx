import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

import { css, cx } from "../../../../../styled-system/css";

type DynamicContainerProps = {
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
};

function DynamicContainer({
  onDelete,
  onMoveUp,
  onMoveDown,
  children,
}: DynamicContainerProps) {
  return (
    <div className={containerStyle}>
      <div className={toolbarStyle}>
        <div className={moveGroupStyle}>
          {onMoveUp && (
            <button type="button" onClick={onMoveUp} className={iconButtonStyle} title="Monter">
              <ArrowUp size={18} />
            </button>
          )}
          {onMoveDown && (
            <button type="button" onClick={onMoveDown} className={iconButtonStyle} title="Descendre">
              <ArrowDown size={18} />
            </button>
          )}
        </div>
        
        {onDelete && (
          <button type="button" onClick={onDelete} className={cx(iconButtonStyle, deleteButtonStyle)} title="Supprimer le composant">
            <Trash2 size={18} />
          </button>
        )}
      </div>
      <div className={contentStyle}>
        {children}
      </div>
    </div>
  );
}

export default DynamicContainer;

const containerStyle = css({
  position: "relative",
  borderRadius: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.08)",
  padding: "2.5rem 2rem 2rem 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  transition: "all 0.3s ease",
  marginBottom: "2.5rem",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  }
});

const toolbarStyle = css({
  position: "absolute",
  right: "1rem",
  top: "0.75rem",
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  padding: "6px",
  backgroundColor: "#2a2a2a",
  borderRadius: "12px",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
  opacity: 0.85,
  transition: "all 0.2s ease",
  zIndex: 10,

  "&:hover": {
    borderColor: "amcoeurRose", // Bordure rose uniquement au survol des actions
    opacity: 1,
    transform: "translateY(-1px)",
  }
});

const moveGroupStyle = css({
  display: "flex",
  gap: "4px",
  borderRight: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.1)",
  paddingRight: "0.5rem",
  marginRight: "0.25rem",
});

const iconButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "34px",
  height: "34px",
  borderRadius: "8px",
  background: "transparent",
  border: "none",
  color: "white", // Blanc par défaut
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "amcoeurPale", // Rose pâle au survol
    transform: "scale(1.1)",
  },

  "&:active": {
    transform: "scale(0.9)",
  }
});

const deleteButtonStyle = css({
  color: "#f87171",
  "&:hover": {
    backgroundColor: "rgba(239, 68, 68, 0.2)!",
    color: "#ff4d4d!",
  }
});

const contentStyle = css({
  width: "100%",
});
