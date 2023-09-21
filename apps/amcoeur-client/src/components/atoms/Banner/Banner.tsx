import React from "react";
import { css, cx } from "../../../../styled-system/css";

type BannerProps = {
  children: React.ReactNode;
  backgroundSrc?: string;
};

function Banner({ children, backgroundSrc = "" }: BannerProps) {
  return (
    <div className={container}>
      <img
        src={"../../../assets/images/chat-pelouse.jpg"}
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
  height: "100%",
  objectFit: "cover",
  objectPosition: "center top",
  zIndex: "-1",
  pointerEvents: "none",
});

export default Banner;
