import { Radio } from "./Radio";
import { FC, useId, useState } from "react";
import { RadioGroupProps } from "./types";

export const RadioGroup: FC<RadioGroupProps> = ({
  name,
  options,
  defaultValue,
  onChange,
  color,
  size,
  direction,
  disabled,
  className,
}) => {
  const generatedName = useId();
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <Radio
          key={option.value}
          id={option.value}
          name={name || generatedName}
          value={option.value}
          label={option.label}
          checked={selectedValue === option.value}
          onChange={handleRadioChange}
          color={color}
          size={size}
          direction={direction}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
