import { css } from "../../../../../styled-system/css";
import Button from "../../atoms/Button/Button";

type DynamicContainerProps = {
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
};

function DynamicContainer({
  onDelete,
  onMoveUp,
  onMoveDown,
  children,
}: DynamicContainerProps) {
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
              icon="arrow-up"
            />
          )}

          {onMoveDown && (
            <Button
              type="button"
              onClick={onMoveDown}
              className={buttonStyle}
              color="blue"
              icon="arrow-down"
            />
          )}
        </>
        {onDelete && (
          <Button
            type="button"
            color="red"
            onClick={onDelete}
            className={buttonStyle}
            icon="trash"
          />
        )}
      </div>
      {children}
    </div>
  );
}

export default DynamicContainer;

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
  display: "flex",
  flexFlow: "column nowrap",
  gap: "16px",
});

const buttonsContainer = css({
  position: "absolute",
  right: "10px",
  top: "10px",
  display: "flex",
  gap: "16px",
});
