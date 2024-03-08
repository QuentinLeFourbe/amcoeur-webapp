import { css } from "../../../../styled-system/css";
import Button from "../../atoms/Button/Button";

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
            <Button type="button" onClick={onMoveUp}>
              Déplacer vers le haut
            </Button>
          )}

          {onMoveDown && (
            <Button type="button" onClick={onMoveDown}>
              Déplacer vers le bas
            </Button>
          )}
        </>
        {onDelete && (
          <Button type="button" onClick={onDelete}>
            Supprimer
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}

export default FormComponentContainer;

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
