import { ImageComponent } from "@amcoeur/types";
import Label from "../../atoms/Label/Label";
import { css } from "../../../../../styled-system/css";

type ImageProps = {
  component: ImageComponent;
};

function Image({ component }: ImageProps) {
  return (
    <div>
      <h2>Image</h2>
      <Label>Image: </Label>
      <img
        src={component.imageUrl}
        className={css({ maxWidth: "200px", maxHeight: "200px" })}
      />
      {component.caption && (
        <>
          <Label>Légende: </Label>
          <p>{component.caption}</p>
        </>
      )}
    </div>
  );
}

export default Image;
