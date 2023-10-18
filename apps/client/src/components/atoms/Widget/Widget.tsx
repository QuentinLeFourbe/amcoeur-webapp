import { useState, useEffect } from "react";
import { css, cx } from "../../../../styled-system/css";
import DonationLogo from "../../../assets/icons/coeur-donate.svg?react";
import { Link } from "react-router-dom";

function Widget() {
  const [atBottom, setAtBottom] = useState(false);

  const handleScroll = () => {
    const widgetElement = document.querySelector(
      ".donation-widget"
    ) as HTMLElement | null;

    if (widgetElement) {
      const widgetHeight = widgetElement.offsetHeight || 0;
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - widgetHeight;
      setAtBottom(isAtBottom);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      to="/donate"
      className={cx(
        "donation-widget",
        widgetButtonStyle,
        fixedElement,
        atBottom && hidden
      )}
    >
      <DonationLogo className={widgetLogo} />
      Je donne
    </Link>
  );
}

const fixedElement = css({
  position: "fixed",
  bottom: "30px",
  right: "20px",
});

const widgetButtonStyle = css({
  display: "flex",
  gap: "15px",
  alignItems: "center",

  padding: "20px 30px",
  borderRadius: "40px",

  fontSize: "1.5rem",
  color: "buttons.widget.text",
  backgroundColor: "buttons.widget.background",

  transition: "0.5s",

  "&:hover": {
    backgroundColor: "buttons.widget.backgroundHover",
  },
});

const hidden = css({
  opacity: 0,
  pointerEvents: "none",
});

const widgetLogo = css({
  width: "40px",
  height: "40px",
});

export default Widget;
