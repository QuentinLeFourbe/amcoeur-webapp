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
      })}
    >
      <ImageContainer src={component.imageUrl || ""} size="medium" />
      <p>{component.caption}</p>
    </div>
  );
}

export default Image;
