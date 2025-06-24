import { useEffect } from "react";
import ReactDOM from "react-dom";

import { css } from "../../../../../styled-system/css";

type OverlayProps = {
  isVisible: boolean;
  onClose: () => void;
};

const Overlay = ({ isVisible, onClose }: OverlayProps) => {
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
        <div className={overlay} onClick={handleClick} />,
        document.body
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
});
