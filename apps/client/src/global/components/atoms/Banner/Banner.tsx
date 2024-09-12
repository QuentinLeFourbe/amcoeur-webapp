import React from "react";
import { css } from "../../../../../styled-system/css";
import defaultBannerImage from "../../../assets/images/banner-chat.webp";

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
  fontFamily: "dancing",
  fontWeight: "700",
  fontSize: { base: "2rem", md: "3rem", lg: "3rem", xl: "4rem" },
  marginLeft: { base: "5vw", md: "10vw", lg: "10vw", xl: "15vw" },
  maxWidth: { base: "100px", md: "200px", lg: "400px", xl: "500px" },
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
