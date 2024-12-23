import PlusIcon from "../../../assets/icons/plus.svg?react";
import Trash from "../../../assets/icons/trash.svg?react";
import ArrowUp from "../../../assets/icons/arrow-up.svg?react";
import ArrowDown from "../../../assets/icons/arrow-down.svg?react";
import XMark from "../../../assets/icons/x-mark.svg?react";
import { css } from "../../../../../styled-system/css";

export type IconType = "trash" | "x-mark" | "plus" | "arrow-up" | "arrow-down";

type IconProps = {
  type: IconType;
  width?: string;
  height?: string;
};

function Icon({ type, width = "20px", height = "20px" }: IconProps) {
  const style = css({ height, width });
  switch (type) {
    case "plus":
      return <PlusIcon className={style} />;
    case "trash":
      return <Trash className={style} />;
    case "x-mark":
      return <XMark className={style} />;
    case "arrow-up":
      return <ArrowUp className={style} />;
    case "arrow-down":
      return <ArrowDown className={style} />;
  }
}

export default Icon;
