import { css } from "../../../../../styled-system/css";
import PlusIcon from "../../../assets/icons/plus.svg?react";
import Button from "../Button/Button";

export const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <Button
        type="button"
        onClick={onClick}
        variants={{ borderRadius: "circle" }}
        className={css({
          alignSelf: "center",
          width: "100px",
          height: "100px",
          "&:hover": { "& svg": { color: "pink.400" } },
        })}
      >
        <PlusIcon
          className={css({ width: "50px", height: "50px", color: "white" })}
        />
      </Button>
    </div>
  );
};
