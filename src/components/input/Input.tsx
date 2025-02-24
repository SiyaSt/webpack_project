import { FC, ReactNode } from "react";
import LoaderIcon from "src/shared/assets/loader.svg";
import { classNames } from "src/shared/utils/ClassName";
import { InputProps } from "./types";
import "./Input.scss";

export const Input: FC<InputProps> = ({
  type = "primary",
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
    inp--${variant}--${type}
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
