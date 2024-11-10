import React from "react";
import TextContainer from "../../atoms/TextContainer/TextContainer";
import { css } from "../../../../../styled-system/css";

type TextPanelProps = {
  children: React.ReactNode;
};

function TextPanel({ children }: TextPanelProps) {
  return (
    <section className={sectionStyle}>
      <TextContainer className={textStyle}>{children}</TextContainer>
    </section>
  );
}

export default TextPanel;

const sectionStyle = css({
  display: "flex",
  justifyContent: "center",
  padding: "0 32px",
});

const textStyle = css({
  flexGrow: 1,
  maxWidth: "1000px",
});
