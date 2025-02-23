import { classNames } from "src/shared/utils/ClassName";
import { Size, Type } from "src/shared/types/types";
import { FC, ReactNode } from "react";
import LoadingIcon from "src/shared/assets/loader.svg";
import "src/components/button/Button.scss";

type IconPosition = "start" | "end";
type ButtonVariant = "filled" | "outlined" | "text";

type ButtonProps = {
  type?: Type;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  variant?: ButtonVariant;
  className?: string;
};

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
    `btn--${variant}`,
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
