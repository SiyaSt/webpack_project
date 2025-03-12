import React, { ChangeEvent } from "react";
import { classNames } from "src/shared/utils/ClassName";
import { CheckboxProps } from "src/components/checkbox/types";
import "./Checkbox.scss";

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  color = "primary",
  size = "small",
  icon,
  className,
  children,
}) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };
  return (
    <div className="checkbox-container">
      <label
        className={classNames(
          className,
          `checkbox checkbox--${color} checkbox--${size} ${disabled ? "disabled" : ""}`,
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          disabled={disabled}
        />
        <span className="custom-checkbox">
          {checked && (icon ? icon : "✓")}
        </span>
        {children}
      </label>
    </div>
  );
};
