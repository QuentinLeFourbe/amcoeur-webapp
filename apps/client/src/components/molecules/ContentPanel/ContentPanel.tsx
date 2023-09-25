import React from "react";
import { css, cx } from "../../../../styled-system/css";
import TextContainer from "../../atoms/TextContainer/TextContainer";
import ImageContainer from "../../atoms/ImageContainer/ImageContainer";

type ContentPanelProps = {
  imageSrc?: string;
  title: string;
  children: React.ReactNode;
  revert?: boolean;
  large?: boolean;
};

function ContentPanel({
  imageSrc = "https://www.detentejardin.com/sites/art-de-vivre/files/dj115_chaton_th.jpg",
  title,
  children,
  revert = false,
  large = false,
}: ContentPanelProps) {
  return (
    <div className={cx(container, revert ? reverse : "")}>
      <ImageContainer src={imageSrc} alt="image" cover size="mediumLandscape" />
      <TextContainer size={large ? "medium" : "small"}>
        <h2>{title}</h2>
        {children}
      </TextContainer>
    </div>
  );
}

const container = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "50px",
  padding: "100px 0",
  backgroundColor: "backgroundSecondary",
});

const reverse = css({
  flexDirection: "row-reverse",
  backgroundColor: "backgroundPrimary",
});

export default ContentPanel;
