import { FC, ReactNode } from "react";
import LoaderIcon from "src/shared/assets/loader.svg";
import { classNames } from "src/shared/utils";
import { InputProps } from "./types";
import "./Input.scss";

export const Input: FC<InputProps> = ({
  color = "primary",
  baseSize = "medium",
  variant = "outlined",
  placeholder = "input",
  buttonSearchText = "",
  onSearch,
  icon,
  value,
  loading,
  className,
  errorText,
  ...props
}) => {
  const handleSearch = () => {
    onSearch?.(value || "");
  };
  const inputClass = classNames(
    className,
    `
    inp
    inp--${baseSize}
    ${errorText ? `inp--${variant}--error` : `inp--${variant}--${color}`}
  `,
  );

  const renderButton = (icon: ReactNode, text: string) => {
    if (!icon && !text) return null;

    return (
      <button
        className="search-button"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? (
          <span className="search-button--loading">
            <LoaderIcon className="loading-icon" />
          </span>
        ) : (
          <>
            {icon && <span className="input-icon">{icon}</span>}
            {text && text}
          </>
        )}
      </button>
    );
  };
  return (
    <div className={classNames("input-container", className)}>
      <div className={inputClass}>
        <input
          type="text"
          placeholder={placeholder}
          className="input-field"
          disabled={loading}
          value={value}
          {...props}
        />
        {renderButton(icon, buttonSearchText)}
      </div>
      <span className="input-error">{errorText}</span>
    </div>
  );
};
