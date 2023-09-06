import React from "react";
import { css, cx } from "../../../../styled-system/css";

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
      <img className={sideImage} src={imageSrc} alt="image" />
      <div className={cx(textContainer, large ? largeText : "")}>
        <h2 className={contentTitle}>{title}</h2>
        <div>{children}</div>
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
  backgroundColor: "backgroundSecondary",
});

const reverse = css({
  flexDirection: "row-reverse",
  backgroundColor: "backgroundPrimary",
});

const largeText = css({
  maxWidth: "700px",
});

const sideImage = css({
  maxWidth: "800px",
  maxHeight: "800px",
  objectFit: "cover",
});

const textContainer = css({
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  maxWidth: "400px",
  "& p": {
    margin: "1rem 0",
  },
});

const contentTitle = css({
  fontSize: "2rem",
  fontWeight: "600",
  color: "textPrimary",
  margin: "0 0 20px 0",
});

export default ContentPanel;
