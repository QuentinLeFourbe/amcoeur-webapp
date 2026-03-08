import { Trash2 } from "lucide-react";
import { css } from "../../../../../styled-system/css";
import Input from "../../atoms/Input/Input";

type ListInputProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: (value: string[]) => void;
  name?: string;
  label?: string;
};

function ListInput({
  value = [],
  onChange,
  onBlur,
  name,
  label = "",
}: ListInputProps) {
  const listValues = [...value];

  if (listValues.length === 0 || listValues[listValues.length - 1] !== "") {
    listValues.push("");
  }

  const handleChangeValue = (changedValue: string, index: number) => {
    const newValues = [...listValues];
    newValues[index] = changedValue;
    onChange?.(newValues);
  };

  const handleOnBlur = (changedValue: string, index: number) => {
    const newValues = [...listValues];
    newValues[index] = changedValue;
    onBlur?.(newValues);
  };

  const handleDeleteValue = (index: number) => {
    const newValues = [...listValues];
    newValues.splice(index, 1);
    onChange?.(newValues);
  };

  return (
    <div className={containerStyle}>
      {label && <label className={labelStyle}>{label}</label>}
      <div className={listStyle}>
        {listValues.map((inputValue, index) => (
          <div key={index} className={rowStyle}>
            <div className={inputWrapperStyle}>
              <Input
                name={`${name}.${index}`}
                value={inputValue}
                placeholder={`Option ${index + 1}...`}
                onChange={(e) => handleChangeValue(e.target.value, index)}
                onBlur={(e) => handleOnBlur(e.target.value, index)}
              />
            </div>
            {index !== listValues.length - 1 && (
              <button
                className={deleteButtonStyle}
                onClick={() => handleDeleteValue(index)}
                type="button"
                title="Supprimer cette option"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  padding: "1.5rem",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
});

const labelStyle = css({
  fontSize: "sm",
  fontWeight: "bold",
  color: "amcoeurPale",
  textTransform: "uppercase",
  letterSpacing: "wider",
});

const listStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

const rowStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const inputWrapperStyle = css({
  flex: 1,
});

const deleteButtonStyle = css({
  background: "transparent",
  border: "none",
  color: "rgba(255, 255, 255, 0.3)",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "8px",
  transition: "all 0.2s",
  "&:hover": {
    color: "#f87171",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  }
});

export default ListInput;
