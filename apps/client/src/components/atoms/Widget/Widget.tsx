import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { css, cx } from "../../../../styled-system/css";
import DonationLogo from "../../../assets/icons/coeur-donate.svg?react";
import useMediaQuery from "../../../hooks/useMediaQuery";

function Widget() {
  const [atBottom, setAtBottom] = useState(false);
  const isMediumScreen = useMediaQuery({ breakpoint: "md" });

  const handleScroll = () => {
    const widgetElement = document.querySelector(
      ".donation-widget",
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
      to="/don"
      className={cx(
        "donation-widget",
        widgetButtonStyle,
        fixedElement,
        atBottom && hidden,
      )}
    >
      <DonationLogo className={widgetLogo} />
      {!isMediumScreen && "Je donne"}
    </Link>
  );
}

const fixedElement = css({
  position: "fixed",
  bottom: { md: "40px", base: "20px" },
  right: { md: "40px", base: "20px" },
});

const widgetButtonStyle = css({
  display: "flex",
  gap: "15px",
  alignItems: "center",

  padding: { md: "30px 50px", base: "20px 20px" },
  borderRadius: "50px",
  fontSize: "18px",
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
  width: { md: "30px", base: "40px" },
  height: { md: "30px", base: "40px" },
});

export default Widget;
