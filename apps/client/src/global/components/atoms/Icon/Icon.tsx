import { css } from "../../../../../styled-system/css";
import FemaleIcon from "../../../assets/icons/female-icon.svg?react";
import MaleIcon from "../../../assets/icons/male-icon.svg?react";

export type IconType = "male" | "female";

type IconProps = {
  type: IconType;
  width?: string;
  height?: string;
};

function Icon({ type, width = "20px", height = "20px" }: IconProps) {
  const style = css({ height, width });
  switch (type) {
    case "male":
      return <MaleIcon className={style} />;
    case "female":
      return <FemaleIcon className={style} />;
  }
}

export default Icon;
