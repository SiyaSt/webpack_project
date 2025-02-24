import { classNames } from "src/shared/utils/ClassName";
import { FC } from "react";
import LoadingIcon from "src/shared/assets/loader.svg";
import { ButtonProps, IconPosition } from "src/components/button/types";
import "./Button.scss";

export const Button: FC<ButtonProps> = ({
  type = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  children,
  icon,
  iconPosition = "start",
  variant = "filled",
  className,
  ...props
}) => {
  const btnClass = classNames(
    className,
    "btn",
    `btn--${type}`,
    `btn--${size}`,
    `btn--${variant}--${type}`,
    {
      "btn--disabled": disabled,
      "btn--loading": loading,
    },
  );

  const renderIcon = (iconPositionArg: IconPosition) => {
    return (
      icon &&
      iconPosition === iconPositionArg && (
        <span className="btn-icon">{icon}</span>
      )
    );
  };
  return (
    <button
      className={btnClass}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-loading-icon">
            <LoadingIcon />
          </span>
          {renderIcon("start")}
          {children}
          {renderIcon("end")}
        </>
      ) : (
        <>
          {renderIcon("start")}
          {children}
          {renderIcon("end")}
        </>
      )}
    </button>
  );
};
