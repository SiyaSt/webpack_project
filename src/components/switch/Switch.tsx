import React, { useState, ChangeEvent } from "react";
import LoadingIcon from "src/shared/assets/loader.svg";
import { Size, Type } from "src/shared/types/types";
import { classNames } from "src/shared/utils/ClassName";
import "./Switch.scss";

type SwitchProps = {
  type?: Type;
  size?: Size;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  loading?: boolean;
  checkedLabel?: string;
  uncheckedLabel?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  className?: string;
};

export const Switch: React.FC<SwitchProps> = ({
  type = "primary",
  size = "medium",
  disabled = false,
  checked = false,
  onChange,
  loading = false,
  checkedLabel,
  uncheckedLabel,
  checkedIcon,
  uncheckedIcon,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  const labelContent = isChecked
    ? checkedLabel || checkedIcon
    : uncheckedLabel || uncheckedIcon;

  return (
    <label
      className={classNames(
        className,
        "switch",
        `switch--${type}`,
        `switch--${size}`,
        disabled ? "switch--disabled" : "",
      )}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={disabled || loading}
      />
      <span className="slider">
        {loading ? (
          <LoadingIcon className="icon spin" />
        ) : (
          <span className="switch-content">{labelContent}</span>
        )}
      </span>
    </label>
  );
};
