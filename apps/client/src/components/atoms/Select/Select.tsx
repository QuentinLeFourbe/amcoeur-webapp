import { forwardRef, ComponentPropsWithRef } from "react";
import { css, cx } from "../../../../styled-system/css";

type Option = {
  value: string;
  label: string;
};

type SelectProps = ComponentPropsWithRef<"select"> & {
  options: Option[];
  className?: string;
  placeholder?: string;
};

/**
 * A custom select component that allows users to select an option from a dropdown list.
 *
 * @param options - An array of objects representing the options available in the dropdown list. Each object should have a 'value' and 'label' property.
 * @param className - An optional CSS class name to apply to the select component.
 *
 * @returns A custom select component with a dropdown list of options.
 *
 * @throws {TypeError} If the options array is empty or if any option object is missing the 'value' or 'label' property.
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, className, placeholder = "Sélectionner...", ...props },
  ref,
) {
  return (
    <select {...props} className={cx(selectStyle, className)} ref={ref}>
      <option value="" selected disabled className={css({ display: "none" })}>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

export default Select;

const selectStyle = css({
  padding: "8px 12px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "pink.200",
  borderRadius: "4px",
  backgroundColor: "#fff",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
  },

  "& option": {
    backgroundColor: "#fff",
    color: "black",
  },
});
