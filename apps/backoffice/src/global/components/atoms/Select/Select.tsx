import React, { KeyboardEvent,useEffect, useRef, useState } from "react";

import { css, cx } from "../../../../../styled-system/css";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  className?: string;
};

/**
 * A custom select component that allows users to select an option from a dropdown list.
 *
 * @param options - An array of objects representing the options available in the dropdown list. Each object should have a 'value' and 'label' property.
 * @param value - The currently selected value from the dropdown list.
 * @param onChange - A callback function that is called when a new option is selected. It receives the value of the selected option as a parameter.
 * @param className - An optional CSS class name to apply to the select component.
 *
 * @returns A custom select component with a dropdown list of options.
 *
 * @throws {TypeError} If the options array is empty or if any option object is missing the 'value' or 'label' property.
 */
function Select({
  options,
  value,
  placeholder,
  onChange,
  onBlur,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    onBlur?.(value || "");
  };

  const selectOption = (selectedValue: string) => {
    onChange?.(selectedValue);
    closeDropdown();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedOptionIndex((prevIndex) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedOptionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex,
      );
    } else if (e.key === "Enter" && focusedOptionIndex !== -1 && isOpen) {
      e.preventDefault();
      selectOption(options[focusedOptionIndex].value);
    } else if (e.key === "Escape") {
      closeDropdown();
    } else if (e.key === "Tab" && isOpen) {
      closeDropdown();
    }
  };

  const focusOption = (index: number) => {
    setFocusedOptionIndex(index);
  };

  useEffect(() => {
    // Fermer le dropdown si l'utilisateur clique en dehors de la liste
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cx(dropdownContainerStyle, className)}
      ref={selectRef}
      onKeyDown={handleKeyDown}
    >
      <button className={dropdownButtonStyle} onClick={toggleDropdown}>
        {value ? (
          options.find((option) => option.value === value)?.label
        ) : (
          <span>{placeholder || "Sélectionner une option"}</span>
        )}
      </button>
      {isOpen && (
        <ul className={dropdownListStyle}>
          {options.map((option, index) => (
            <li
              key={option.value}
              onClick={() => selectOption(option.value)}
              onMouseEnter={() => focusOption(index)}
              className={index === focusedOptionIndex ? "focused" : ""}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;

const dropdownListStyle = css({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  padding: 0,
  margin: 0,
  listStyle: "none",
  backgroundColor: "#fff",
  color: "black",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  "& li": {
    padding: "8px 12px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&.focused": {
      backgroundColor: "#f5f5f5",
    },
  },
});

const dropdownButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "8px 12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#f4f4f4",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
  },
});

const dropdownContainerStyle = css({
  position: "relative",
});
