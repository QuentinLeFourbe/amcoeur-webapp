import { css } from "../../../../styled-system/css";
import Button from "../../../global/components/atoms/Button/Button";

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
