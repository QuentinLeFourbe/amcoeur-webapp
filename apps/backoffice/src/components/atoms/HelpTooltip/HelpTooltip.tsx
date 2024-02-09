import React, { useState } from "react";
import { css } from "../../../../styled-system/css";
import QuestionMark from "../../../assets/icons/question_mark.svg?react";

type HelpTooltipProps = {
  children: React.ReactNode;
};

function HelpTooltip({ children }: HelpTooltipProps) {
  const [showContent, setShowContent] = useState(false);

  return (
    <div
      className={container}
      onMouseEnter={() => setShowContent(true)}
      onMouseLeave={() => setShowContent(false)}
    >
      <QuestionMark className={questionMarkStyle} />
      {showContent && <div className={contentStyle}>{children}</div>}
    </div>
  );
}

export default HelpTooltip;

const contentStyle = css({
  position: "relative",
  zIndex: 1,
  backgroundColor: "white",
  color: "black",
  padding: "1rem",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  right: "-150%",
  bottom: "150%",
  width: "fit-content",
  minWidth: "500px",
});

const questionMarkStyle = css({
  position: "relative",
  cursor: "pointer",
  width: "100%",
  height: "100%",
});

const container = css({
  "&:hover": {
    "& > div": {
      display: "block",
    },
  },
  width: "40px",
  height: "40px",
  backgroundColor: "blue.900",
  borderRadius: "50%",
  padding: "4px",
});
