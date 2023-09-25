import { css, cx } from "../../../../styled-system/css";

type ImageContainerProps = {
  src: string;
  alt: string;
  size?:
    | "smallLandscape"
    | "smallPortrait"
    | "mediumLandscape"
    | "mediumPortrait"
    | "largeLandscape"
    | "largePortrait"
    | "background";
  classname?: string;
  cover?: boolean;
};

/**
 * Basic container for images. It should allow the user to set the size of the image, and whether it should be a background image or not.
 * @param src: The source of the image.
 * @param alt: The alt text of the image.
 * @param size: The size of the image.
 * @param classname: The classname of the image, if the user wants to add more styles.
 * @param cover: Whether the image should cover the container or not.
 * @returns
 */
function ImageContainer({
  src,
  alt,
  size,
  classname,
  cover = false,
}: ImageContainerProps) {
  let style = "";
  switch (size) {
    case "smallLandscape":
      style = smallLandscape;
      break;
    case "smallPortrait":
      style = smallPortrait;
      break;
    case "mediumLandscape":
      style = mediumLandscape;
      break;
    case "mediumPortrait":
      style = mediumPortrait;
      break;

    case "largePortrait":
      style = largePortrait;
      break;
    case "background":
      style = background;
      break;
    case "largeLandscape":
    default:
      style = largeLandscape;
      break;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cx(style, cover ? coverStyle : "", classname)}
    />
  );
}

const coverStyle = css({
  objectFit: "cover",
  objectPosition: "center top",
});

const smallLandscape = css({
  maxWidth: "500px",
  maxHeight: "200px",
});
const smallPortrait = css({
  maxWidth: "200px",
  maxHeight: "500px",
});
const mediumLandscape = css({
  maxWidth: "800px",
  maxHeight: "500px",
});
const mediumPortrait = css({
  maxWidth: "500px",
  maxHeight: "800px",
});
const largeLandscape = css({
  maxWidth: "1000px",
  maxHeight: "800px",
});
const largePortrait = css({
  maxWidth: "800px",
  maxHeight: "1000px",
});

const background = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center top",
  zIndex: "-1",
  pointerEvents: "none",
});

export default ImageContainer;
