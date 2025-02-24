import { ChangeEvent, FC } from "react";
import { classNames } from "src/shared/utils/ClassName";
import { Size, Type } from "src/shared/types/types";
import "./Radio.scss";

type Direction = "vertical" | "horizontal";
type RadioProps = {
  id: string;
  name: string;
  value: string;
  label?: string;
  type?: Type;
  size?: Size;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: string) => void;
  direction?: Direction;
  className?: string;
};

export const Radio: FC<RadioProps> = ({
  id,
  name,
  value,
  label,
  type = "primary",
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
          `radio--${type}`,
          `radio--${size}`,
          disabled ? "radio--disabled" : "",
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
