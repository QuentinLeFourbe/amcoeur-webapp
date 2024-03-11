import { ImageComponent } from "@amcoeur/types";
import ImageContainer from "../../atoms/ImageContainer/ImageContainer";
import { css } from "../../../../styled-system/css";

type ImageProps = {
  component: ImageComponent;
};

function Image({ component }: ImageProps) {
  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        marginBottom: "64px"
      })}
    >
      <ImageContainer src={component.imageUrl || ""} size="medium" />
      <p className={css({maxWidth: "700px", textAlign: "center", marginTop: "1rem"})}>{component.caption}</p>
    </div>
  );
}

export default Image;
