import { ComponentProps, useEffect } from "react";
import ReactDOM from "react-dom";

import { css, cx } from "../../../../../styled-system/css";

type OverlayProps = ComponentProps<"div"> & {
  isVisible: boolean;
  onClose: () => void;
};

const Overlay = ({ isVisible, onClose, ...props }: OverlayProps) => {
  const handleClick = () => {
    onClose();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isVisible) {
      document.addEventListener("keydown", handleEscape, false);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [isVisible, onClose]);

  return isVisible
    ? ReactDOM.createPortal(
        <div className={overlay} onClick={handleClick}>
          {props.children && (
            <div {...props} className={cx(windowStyle, props.className)} />
          )}
        </div>,
        document.body,
      )
    : null;
};

export default Overlay;

const overlay = css({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "100",
  backgroundColor: "rgba(0, 0, 0, 0.5)",

  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
});

const windowStyle = css({
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",


  padding: "1rem",

  backgroundColor:"gray.700", 
  borderRadius: "16px",
});
