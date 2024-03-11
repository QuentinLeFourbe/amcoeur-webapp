import React from "react";
import TextContainer from "../../atoms/TextContainer/TextContainer";
import { css } from "../../../../styled-system/css";

type TextPanelProps = {
  children: React.ReactNode;
};

function TextPanel({ children }: TextPanelProps) {
  return (
    <div className={flexContainer}>
      <TextContainer size="large">{children}</TextContainer>
    </div>
  );
}

const flexContainer = css({
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "64px",
});

export default TextPanel;
