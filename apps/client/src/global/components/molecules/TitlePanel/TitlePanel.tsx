import React from "react";
import { css } from "../../../../../styled-system/css";
import ImageContainer from "../../atoms/ImageContainer/ImageContainer";
import TextContainer from "../../atoms/TextContainer/TextContainer";

type TitlePanelProps = {
  src?: string;
  alt?: string;
  children: React.ReactNode;
  size?:  "medium" | "large";
};

function TitlePanel({ src, alt = "", children, size }: TitlePanelProps) {

  let textContainerSize = src ?   mediumContainerSize : largeTextContainerSize;
  switch (size) {
    case "medium":
      textContainerSize = mediumContainerSize;
      break;
    case "large":
      textContainerSize = largeTextContainerSize;
      break;
  }

  return (
    <div className={container}>
      {src && <ImageContainer src={src} alt={alt} size="mediumLandscape" />}
      <TextContainer className={textContainerSize}>{children}</TextContainer>
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
  padding: "20px 0px ",
});

const mediumContainerSize = css({
  maxWidth: { base: "800px", xl: "600px" },
});

const largeTextContainerSize = css({
  maxWidth: { base: "800px", xl: "1200px" },
});
