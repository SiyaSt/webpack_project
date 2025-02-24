import React, { useState, ChangeEvent, FC } from "react";
import LoadingIcon from "src/shared/assets/loader.svg";
import { classNames } from "src/shared/utils/ClassName";
import { SwitchProps } from "src/components/switch/types";
import "./Switch.scss";

export const Switch: FC<SwitchProps> = ({
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
