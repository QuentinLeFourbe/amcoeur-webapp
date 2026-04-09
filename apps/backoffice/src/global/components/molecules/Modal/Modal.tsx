import { ReactNode } from "react";

import { css } from "../../../../../styled-system/css";
import Button from "../../atoms/Button/Button";
import Overlay from "../../atoms/Overlay/Overlay";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary" | "success";
  isLoading?: boolean;
  hideCancel?: boolean;
};

const Modal = ({
  isVisible,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "primary",
  isLoading = false,
  hideCancel = false,
}: ModalProps) => {
  return (
    <Overlay 
      isVisible={isVisible} 
      onClose={onClose} 
      className={modalContent} 
      onClick={(e) => e.stopPropagation()}
    >
      <div className={headerStyle}>
        <h2 className={titleStyle}>{title}</h2>
      </div>
      
      <div className={bodyStyle}>
        {children}
      </div>

      <div className={footerStyle}>
        {!hideCancel && (
          <Button color="secondary" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
        )}
        {onConfirm && (
          <Button 
            color={variant === "danger" ? "danger" : variant === "success" ? "success" : "primary"} 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Chargement..." : confirmText}
          </Button>
        )}
      </div>
    </Overlay>
  );
};

export default Modal;

const modalContent = css({
  backgroundColor: "#1e1e1e", // amcoeurDark
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  padding: "2rem!", // Overriding Overlay's default padding
  maxWidth: "500px",
  width: "90%",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem!",
  alignItems: "stretch!",
});

const headerStyle = css({
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  paddingBottom: "1rem",
});

const titleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
  color: "white",
});

const bodyStyle = css({
  fontSize: "sm",
  color: "rgba(255, 255, 255, 0.7)",
  lineHeight: "relaxed",
});

const footerStyle = css({
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
  marginTop: "0.5rem",
});
