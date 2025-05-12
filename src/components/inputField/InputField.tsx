import { FC } from "react";
import { Input } from "src/components";
import { Color } from "src/shared/types/types";

type FieldType = "input" | "textarea";

interface InputFieldProps {
  type?: FieldType;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  label: string;
  errorText?: string;
  rows?: number;
  color?: Color;
}

export const InputField: FC<InputFieldProps> = ({
  type = "input",
  value,
  onChange,
  onBlur,
  label,
  errorText,
  rows = 4,
  color = "secondary",
}) => (
  <div className="input-wrapper">
    <label>{label}</label>
    {type === "textarea" ? (
      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          rows={rows}
        />
        {errorText && <div className="error-message">{errorText}</div>}
      </div>
    ) : (
      <Input
        color={color}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        errorText={errorText}
      />
    )}
  </div>
);
