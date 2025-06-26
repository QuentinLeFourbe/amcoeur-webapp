import { Plus } from "lucide-react";
import { css } from "../../../../../styled-system/css";
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
        borderRadius="circle"
        className={css({
          alignSelf: "center",
          "&:hover": { "& svg": { color: "pink.400" } },
        })}
      >
        <Plus strokeWidth={"1px"} width={"80px"} height={"80px"} />
      </Button>
    </div>
  );
};
