import { css } from "../../../../../styled-system/css";
import Button from "../../atoms/Button/Button";
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
    <fieldset>
      {label && (
        <legend className={css({ fontWeight: "bold", marginBottom: "8px" })}>
          {label}
        </legend>
      )}
      <div
        className={css({
          display: "flex",
          flexFlow: "column nowrap",
          gap: "16px",
        })}
      >
        {listValues.map((inputValue, index) => (
          <div
            key={index}
            className={css({
              display: "flex",
              flexFlow: "row nowrap",
              gap: "16px",
              alignItems: "center",
            })}
          >
            <label
              className={css({ display: "none" })}
              htmlFor={`${name}.${index}`}
            >{`${label} champs ${index}`}</label>
            <Input
              name={`${name}.${index}`}
              value={inputValue}
              onChange={(e) => handleChangeValue(e.target.value, index)}
              onBlur={(e) => handleOnBlur(e.target.value, index)}
            />
            {index !== listValues.length - 1 && (
              <Button
                color="red"
                icon="trash"
                onClick={() => handleDeleteValue(index)}
                type="button"
              />
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default ListInput;
