import { ChevronDown } from "lucide-react";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

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

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className={cx(dropdownContainerStyle, className)}
      ref={selectRef}
      onKeyDown={handleKeyDown}
    >
      <button 
        className={cx(dropdownButtonStyle, isOpen && activeButtonStyle)} 
        onClick={toggleDropdown}
        type="button"
      >
        <span className={selectedOption ? textStyle : placeholderStyle}>
          {selectedOption ? selectedOption.label : (placeholder || "Sélectionner une option")}
        </span>
        <ChevronDown 
          size={18} 
          className={cx(chevronStyle, isOpen && rotateChevronStyle)} 
        />
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

const dropdownContainerStyle = css({
  position: "relative",
  width: "100%",
});

const dropdownButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "0.75rem 0.25rem",
  backgroundColor: "transparent",
  borderBottom: "2px solid",
  borderColor: "rgba(255, 255, 255, 0.2)",
  cursor: "pointer",
  color: "white",
  transition: "all 0.3s ease",
  outline: "none",

  "&:hover": {
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
});

const activeButtonStyle = css({
  borderColor: "amcoeurRose!",
  backgroundColor: "rgba(225, 29, 72, 0.05)",
});

const textStyle = css({
  color: "white",
  fontSize: "sm",
});

const placeholderStyle = css({
  color: "rgba(255, 255, 255, 0.4)",
  fontSize: "sm",
});

const chevronStyle = css({
  color: "amcoeurRose",
  transition: "transform 0.3s ease",
});

const rotateChevronStyle = css({
  transform: "rotate(180deg)",
});

const dropdownListStyle = css({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  width: "100%",
  padding: "0.5rem",
  margin: 0,
  listStyle: "none",
  backgroundColor: "#1e1e1e", // amcoeurDark adouci
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
  
  "& li": {
    padding: "0.75rem 1rem",
    cursor: "pointer",
    borderRadius: "8px",
    color: "white",
    fontSize: "sm",
    transition: "all 0.2s ease",
    
    "&:hover": {
      backgroundColor: "rgba(225, 29, 72, 0.1)",
      color: "amcoeurRose",
    },
    
    "&.focused": {
      backgroundColor: "rgba(225, 29, 72, 0.1)",
      color: "amcoeurRose",
    },
  },
});
