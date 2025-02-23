import React, { useState, useRef, useEffect, useCallback } from "react";
import { Option, Size, Type, Variants } from "src/shared/types/types";
import "./Select.scss";
import { classNames } from "src/shared/utils/ClassName";

interface SelectProps {
  type?: Type;
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  size?: Size;
  variant?: Variants;
  filterOption?: (option: Option, searchText: string) => boolean;
  hideSelectedOptions?: boolean;
  onChange: (selectedOptions: Option | Option[] | null) => void;
  value?: Option | Option[] | null;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  type,
  options,
  isMulti = false,
  placeholder = "Select...",
  size = "medium",
  variant = "outlined",
  filterOption,
  hideSelectedOptions = false,
  onChange,
  value,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOptions = Array.isArray(value) ? value : value ? [value] : [];

  const handleOptionClick = (option: Option) => {
    if (isMulti) {
      const isSelected = selectedOptions.some(
        (selected) => selected.value === option.value,
      );
      let newOptions;
      if (isSelected) {
        newOptions = selectedOptions.filter(
          (selected) => selected.value !== option.value,
        );
      } else {
        newOptions = [...selectedOptions, option];
      }
      onChange(newOptions);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };

  const handleClearSelection = useCallback(() => {
    onChange(null);
  }, [onChange]);

  const filteredOptions = options.filter((option) => {
    if (
      hideSelectedOptions &&
      selectedOptions.some((selected) => selected.value === option.value)
    ) {
      return false;
    }
    if (filterOption) {
      return filterOption(option, searchText);
    }
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [selectRef],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div
      className={classNames(
        className,
        "select",
        `select--${size}`,
        `select--${variant}--${type}`,
        `select--${type}`,
      )}
      ref={selectRef}
    >
      <div className="select--header" onClick={() => setIsOpen(!isOpen)}>
        <span className="select--placeholder">
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.label).join(", ")
            : placeholder}
        </span>
        {selectedOptions.length > 0 && (
          <button
            className="select--clear"
            onClick={(e) => {
              e.stopPropagation();
              handleClearSelection();
            }}
          >
            &times;
          </button>
        )}
      </div>
      {isOpen && (
        <div className="select--dropdown">
          <input
            type="text"
            className="select--search"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {filteredOptions.length > 0 ? (
            <ul className="select--options">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={classNames("select--option", {
                    "select--option--selected": selectedOptions.some(
                      (selected) => selected.value === option.value,
                    ),
                  })}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="select--no-options">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};
