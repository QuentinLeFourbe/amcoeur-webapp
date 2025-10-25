import React from "react";

import { css, cx } from "../../../../../styled-system/css";
import Button from "../../atoms/Button/Button";
import ImageContainer from "../../atoms/ImageContainer/ImageContainer";
import TextContainer from "../../atoms/TextContainer/TextContainer";

type ContentPanelProps = {
  imageUrl?: string;
  title: string;
  children: React.ReactNode;
  link: string;
  linkLabel: string;
  revert?: boolean;
};

function ContentPanel({
  imageUrl,
  title,
  children,
  link,
  linkLabel,
  revert = false,
}: ContentPanelProps) {
  return (
    <div className={cx(container, revert ? reverse : primaryBackground)}>
      {imageUrl && (
        <ImageContainer
          src={imageUrl}
          alt="image"
          cover
          size="mediumLandscape"
        />
      )}
      <div>
        <TextContainer className={textContainerSize}>
          <h2>{title}</h2>
          {children}
        </TextContainer>
        {linkLabel && (
          <Button rounded to={link || "#"}>
            {linkLabel}
          </Button>
        )}
      </div>
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
});

const reverse = css({
  flexDirection: "row-reverse",
  backgroundColor: "backgrounds.primary.extraLight",
});

const primaryBackground = css({
  backgroundColor: "backgrounds.secondary.light",
});

const textContainerSize = css({
  maxWidth: { base: "800px", xl: "600px" },
  padding: "1rem 0",
});

export default ContentPanel;
