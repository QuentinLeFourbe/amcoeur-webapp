import ImageContainer from "../../atoms/ImageContainer/ImageContainer";
import { css } from "../../../../../styled-system/css";

type ImageProps = {
  imageUrl: string;
  caption?: string;
};

function Image({ imageUrl, caption }: ImageProps) {
  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        marginBottom: "64px",
      })}
    >
      <ImageContainer src={imageUrl || ""} size="medium" />
      {caption && (
        <p
          className={css({
            maxWidth: "700px",
            textAlign: "center",
            marginTop: "1rem",
          })}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

export default Image;
