import { useState, useRef, useEffect, useCallback, FC } from "react";
import { Option } from "src/shared/types/types";
import { classNames } from "src/shared/utils/ClassName";
import "./Select.scss";
import { SelectProps } from "src/components/select/types";

export const Select: FC<SelectProps> = ({
  color = "primary",
  options,
  placeholder = "Select...",
  size = "medium",
  variant = "outlined",
  filterOption,
  onChange,
  value,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = value || null;

  const handleRadioChange = useCallback(
    (option: Option | null) => {
      onChange?.(option);
    },
    [onChange],
  );

  const handleOptionClick = (option: Option) => {
    handleRadioChange(option);
    setIsOpen(false);
  };

  const handleClearSelection = useCallback(() => {
    handleRadioChange(null);
  }, [handleRadioChange]);

  const filteredOptions = options.filter((option) => {
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

  useEffect(() => {
    if (value !== selectedOption) {
      setSearchText("");
    }
  }, [selectedOption, value]);
  return (
    <div
      className={classNames(
        className,
        "select",
        `select--${size}`,
        `select--${variant}--${color}`,
        `select--${color}`,
      )}
      ref={selectRef}
    >
      <div className="select--header" onClick={() => setIsOpen(!isOpen)}>
        <span className="select--placeholder">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {selectedOption && (
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
                    "select--option--selected":
                      selectedOption?.value === option.value,
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
