import React, { ChangeEvent, ReactNode, useState } from "react";
import { classNames } from "src/shared/utils/ClassName";
import { Size, Type } from "src/shared/types/types";
import "./Checkbox.scss";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  type?: Type;
  size?: Size;
  icon?: ReactNode;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  type = "primary",
  size = "small",
  icon,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    } else {
      setIsChecked((prevState) => !prevState);
    }
  };
  return (
    <label
      className={classNames(
        className,
        `checkbox checkbox--${type} checkbox--${size} ${disabled ? "disabled" : ""}`,
      )}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={disabled}
      />
      <span className="custom-checkbox">
        {isChecked && (icon ? icon : "✓")}
      </span>
      {label && <span className="checkbox--label">{label}</span>}
    </label>
  );
};
