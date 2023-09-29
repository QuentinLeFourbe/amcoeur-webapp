import { useState, useEffect } from "react";
import { css } from "../../../../styled-system/css";
import DonationLogo from "../../../assets/images/logo-don.png";

function Widget() {
  const [atBottom, setAtBottom] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleScroll = () => {
    const widgetElement = document.querySelector(
      ".widgetStyleClassName"
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
      className={`${widgetStyle} ${atBottom ? "hidden" : ""} ${
        hovered ? "hovered" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={widgetContentStyle}>
        <img src={DonationLogo} className={widgetLogo} alt="Donation-Logo" />

        <button className={widgetButtonStyle}>Je donne</button>
      </div>
    </div>
  );
}

const widgetStyle = css({
  position: "fixed",
  bottom: "30px",
  right: "20px",
  fontFamily: "Roboto,sans-serif",
  backgroundColor: "#d96a14",
  padding: "10px",
  borderRadius: "40px",
  transition: "0.5s",
  "&.hidden": {
    opacity: 0,
  },
  "&.hovered": {
    backgroundColor: "#FFA500",
  },
});

const widgetContentStyle = css({
  display: "flex",
  alignItems: "center",
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
