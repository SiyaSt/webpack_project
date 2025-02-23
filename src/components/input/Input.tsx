import { ChangeEvent, FC, ReactNode } from "react";
import LoaderIcon from "src/shared/assets/loader.svg";
import { classNames } from "src/shared/utils/ClassName";
import { Size } from "src/shared/types/types";
import "./Input.scss";

interface InputProps {
  size?: Size;
  variant?: "outlined" | "filled" | "borderless" | "underlined";
  placeholder?: string;
  onSearch?: (value: string) => void;
  multiline?: boolean;
  buttonSearchText?: string;
  icon?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value?: string;
  loading?: boolean;
  className?: string;
}

export const Input: FC<InputProps> = ({
  size = "medium",
  variant = "outlined",
  placeholder = "input",
  onSearch,
  multiline = false,
  buttonSearchText = "",
  icon,
  onChange,
  value,
  loading,
  className,
}) => {
  const handleSearch = () => {
    if (onSearch) {
      onSearch(value || "");
    }
  };
  const inputClass = classNames(
    className,
    `
    inp
    inp--${size}
    inp--${variant}
  `,
  );

  const renderButton = (icon: ReactNode, text: string) => {
    return (
      <>
        {text || icon ? (
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <span className="search-button--loading">
                <LoaderIcon className="loading-icon" />
                {icon && <span className="input-icon">{icon}</span>}
                {text && text}
              </span>
            ) : icon ? (
              <span className="input-icon">{icon}</span>
            ) : (
              text
            )}
          </button>
        ) : null}
      </>
    );
  };
  return (
    <div className={inputClass}>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          className="input-field"
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="input-field"
          onChange={onChange}
          value={value}
        />
      )}
      {renderButton(icon, buttonSearchText)}
    </div>
  );
};
