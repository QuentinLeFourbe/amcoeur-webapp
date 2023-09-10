import React from "react";
import { css, cx } from "../../../../styled-system/css";

type BannerProps = {
  children: React.ReactNode;
  backgroundSrc?: string;
};

function Banner({
  children,
  backgroundSrc = "https://www.medoretcie.com/media/Sparkow/Navigation/Brands/saVraieNatureChat.jpg",
}: BannerProps) {
  return (
    <div className={container}>
      <img
        className={backgroundImage}
        src={backgroundSrc}
        alt="Image bannière"
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
});

const textContainer = css({
  color: "textSecondary",
  fontSize: "2rem",
  fontWeight: "600",
  marginLeft: "15vw",
  maxWidth: "500px",
});

const backgroundImage = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center top",
  zIndex: "-1",
  pointerEvents: "none",
});

export default Banner;
