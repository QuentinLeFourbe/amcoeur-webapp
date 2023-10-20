import React from "react";
import { css } from "../../../../styled-system/css";
import ImageContainer from "../../atoms/ImageContainer/ImageContainer";
import TextContainer from "../../atoms/TextContainer/TextContainer";

type TitlePanelProps = {
  src?: string;
  alt?: string;
  children: React.ReactNode;
};

function TitlePanel({ src, alt = "", children }: TitlePanelProps) {
  return (
    <div className={container}>
      {src && <ImageContainer src={src} alt={alt} size="mediumLandscape" />}
      <TextContainer size="medium">{children}</TextContainer>
    </div>
  );
}

export default TitlePanel;

const container = css({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "50px",
  margin: "0px 0px 50px 0",
  background: "backgrounds.primary.light",
  padding: "75px",
});
