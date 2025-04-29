import { ChangeEvent, FC } from "react";
import { classNames } from "src/shared/utils";
import { RadioProps } from "./types";
import "./Radio.scss";

export const Radio: FC<RadioProps> = ({
  id,
  name,
  value,
  label,
  color = "primary",
  size = "medium",
  disabled = false,
  checked = false,
  onChange,
  direction = "vertical",
  className,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(event.target.value);
  };

  return (
    <div className={`radio-container radio-container--${direction}`}>
      <label
        className={classNames(
          className,
          "radio",
          `radio--${color}`,
          `radio--${size}`,
          { "radio--disabled": disabled },
        )}
        htmlFor={id}
      >
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        {label && <span className="radio-label">{label}</span>}
      </label>
    </div>
  );
};
