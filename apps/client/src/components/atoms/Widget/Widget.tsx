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
    <div
      className={`donation-widget ${widgetStyle} ${atBottom ? "hidden" : ""} 
      }`}
    >
      <Link to="/donate" className={cx(widgetButtonStyle, widgetContentStyle)}>
        <DonationLogo className={widgetLogo} />
        Je donne
      </Link>
    </div>
  );
}

const widgetStyle = css({
  position: "fixed",
  bottom: "30px",
  right: "20px",
  backgroundColor: "buttons.primary.background",
  padding: "10px",
  borderRadius: "40px",
  transition: "0.5s",
  "&.hidden": {
    opacity: 0,
  },
  "&:hover": {
    backgroundColor: "buttons.primary.backgroundHover",
  },
});

const widgetContentStyle = css({
  display: "flex",
  gap: "15px",
  alignItems: "center",
  "&:hover": { color: "textPrimary" },
});

const widgetButtonStyle = css({
  marginRight: "5px",
  fontSize: "1.5rem",
  padding: "10px 20px",
});

const widgetLogo = css({
  width: "40px",
  height: "40px",
});

export default Widget;
