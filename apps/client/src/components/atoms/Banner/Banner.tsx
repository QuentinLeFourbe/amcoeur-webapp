import React from "react";
import { css } from "../../../../styled-system/css";
import defaultBannerImage from "../../../assets/images/chat-pelouse-3.webp";

type BannerProps = {
  children: React.ReactNode;
  backgroundSrc?: string;
};

function Banner({ children, backgroundSrc = defaultBannerImage }: BannerProps) {
  return (
    <div className={container}>
      <img
        className={backgroundImage}
        src={backgroundSrc}
        alt="Image bannière de Amcoeur"
        loading="lazy"
      />
      <div className={textContainer}>{children}</div>
    </div>
  );
}

const container = css({
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  height: "350px",
  position: "relative",
});

const textContainer = css({
  color: "textSecondary",
  fontFamily: "heading",
  fontSize: "4rem",
  marginLeft: "15vw",
  maxWidth: "500px",
});

const backgroundImage = css({
  position: "absolute",
  height: "100%",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
  zIndex: "-1",
  pointerEvents: "none",
});

export default Banner;
