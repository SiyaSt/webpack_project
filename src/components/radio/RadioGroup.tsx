import { Radio } from "./Radio";
import { FC, useState } from "react";
import { RadioGroupProps } from "src/components/radio/types";

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
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <Radio
          key={option.id}
          id={option.id}
          name={name}
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
