import { FC } from "react";
import { Input } from "src/components";

type FieldType = "input" | "textarea";

interface InputFieldProps {
  type?: FieldType;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  label: string;
  errorText?: string;
  rows?: number;
  color?: "primary" | "secondary";
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
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={rows}
        className={errorText ? "error" : ""}
      />
    ) : (
      <Input
        color={color}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        errorText={errorText}
      />
    )}
    {errorText && <div className="error-message">{errorText}</div>}
  </div>
);
