import { css } from "../../../../styled-system/css";
import FormCheckbox from "../../molecules/Form/FormCheckbox";

type MultipleSelectProps = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  name: string;
};

function MultipleSelect({
  options,
  value = [],
  onChange,
  name,
}: MultipleSelectProps) {
  const handleChange = (checked: boolean, changedValue: string) => {
    const newValues = [...value];
    if (checked) {
      newValues.push(changedValue);
    } else {
      const changedValueIndex = value?.findIndex((val) => val === changedValue);
      newValues.splice(changedValueIndex, 1);
    }
    onChange(newValues);
  };

  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        gap: "8px",
      })}
    >
      {options.map((choice, index) => (
        <FormCheckbox
          checked={!!value?.find((item) => item === choice)}
          onChange={(e) => handleChange(e.target.checked, choice)}
          name={name}
          key={index}
        >
          {choice}
        </FormCheckbox>
      ))}
    </div>
  );
}

export default MultipleSelect;
