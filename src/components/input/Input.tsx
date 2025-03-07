import { FC, ReactNode } from "react";
import LoaderIcon from "src/shared/assets/loader.svg";
import { classNames } from "src/shared/utils/ClassName";
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
    if (onSearch) {
      onSearch(value || "");
    }
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
    <div className={"input-container"}>
      <div className={inputClass}>
        <input
          type="text"
          placeholder={placeholder}
          className="input-field"
          {...props}
        />
        {renderButton(icon, buttonSearchText)}
      </div>
      <span className="input-error">{errorText}</span>
    </div>
  );
};
