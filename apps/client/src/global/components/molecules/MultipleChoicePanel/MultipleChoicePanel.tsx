import React from "react";
import { css, cx } from "../../../../../styled-system/css";

type MultipleChoicePanelProps = {
  buttons: { name: string; onClick: () => void }[];
  activeButtonIndex?: number;
};

function MultipleChoicePanel({
  buttons,
  activeButtonIndex,
}: MultipleChoicePanelProps) {
  const [activeButtonIndexState, setActiveButtonIndex] =
    React.useState(activeButtonIndex);

  const handleButtonClick = (onClick: () => void, index: number) => {
    setActiveButtonIndex(index);
    onClick();
  };

  return (
    <div className={buttonsContainer}>
      {buttons.map(({ name, onClick }, index) => (
        <button
          key={name}
          className={cx(
            buttonStyle,
            index === 0 ? borderRadiusLeft : "",
            index === buttons.length - 1 ? borderRadiusRight : "",
            index === activeButtonIndexState ? activeButton : ""
          )}
          onClick={() => handleButtonClick(onClick, index)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

const buttonsContainer = css({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#fff",
  borderRadius: "10px",
});

const buttonStyle = css({
  padding: "10px 20px",
  backgroundColor: "buttonTertiary",
  color: "textPrimary",
  border: "1px lightgrey solid",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "buttonTertiaryHover",
  },

  "&:active": {
    backgroundColor: "buttonTertiaryActive",
  },
});

const borderRadiusLeft = css({
  borderRadius: "10px 0 0 10px",
});

const borderRadiusRight = css({
  borderRadius: "0 10px 10px 0",
});

const activeButton = css({
  backgroundColor: "buttonTertiaryActive",
});

export default MultipleChoicePanel;
