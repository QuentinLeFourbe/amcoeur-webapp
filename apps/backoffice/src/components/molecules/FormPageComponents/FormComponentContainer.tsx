import { css } from "../../../../styled-system/css";
import Button from "../../atoms/Button/Button";
import ArrowUp from "../../../assets/icons/arrow-up.svg?react";
import ArrowDown from "../../../assets/icons/arrow-down.svg?react";
import Trash from "../../../assets/icons/trash.svg?react";

type FormComponentContainerProps = {
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
};

function FormComponentContainer({
  onDelete,
  onMoveUp,
  onMoveDown,
  children,
}: FormComponentContainerProps) {
  return (
    <div className={container}>
      <div className={buttonsContainer}>
        <>
          {onMoveUp && (
            <Button
              type="button"
              onClick={onMoveUp}
              className={buttonStyle}
              color="blue"
            >
              <ArrowUp className={css({ width: "30px", height: "30px" })} />
            </Button>
          )}

          {onMoveDown && (
            <Button
              type="button"
              onClick={onMoveDown}
              className={buttonStyle}
              color="blue"
            >
              <ArrowDown className={css({ width: "30px", height: "30px" })} />
            </Button>
          )}
        </>
        {onDelete && (
          <Button
            type="button"
            color="red"
            onClick={onDelete}
            className={buttonStyle}
          >
            <Trash className={css({ width: "30px", height: "30px" })} />
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}

export default FormComponentContainer;

const buttonStyle = css({
  padding: "8px",
});

const container = css({
  position: "relative",
  borderRadius: "16px",
  backgroundColor: "neutral.800",
  borderStyle: "solid",
  borderWidth: "2px",
  borderColor: "neutral.700",
  padding: "32px",
});

const buttonsContainer = css({
  position: "absolute",
  right: "10px",
  top: "10px",
  display: "flex",
  gap: "16px",
});
