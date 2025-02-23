import { classNames } from "src/shared/utils/ClassName";
import { Size, Type } from "src/shared/types/types";
import { FC, ReactNode } from "react";
import "src/components/button/Button.scss";

type IconPosition = "start" | "end";
type ButtonVariant = "filled" | "outlined" | "text";

type ButtonProps = {
  type?: Type;
  size?: Size;
  disabled?: boolean;
  loading?: boolean | { icon?: ReactNode };
  onClick?: () => void;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  variant?: ButtonVariant;
  color?: string;
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
  color,
}) => {
  const isLoading =
    typeof loading === "boolean" ? loading : Boolean(loading?.icon);
  const loadingIcon =
    typeof loading === "object" && loading.icon ? (
      <span className="btn-loading-icon">{loading.icon}</span>
    ) : (
      <span className="btn-loading-spinner" />
    );

  const btnClass = classNames(
    "btn",
    `btn--${type}`,
    `btn--${size}`,
    `btn--${variant}`,
    `btn--color-${color}`,
    {
      "btn--disabled": disabled,
      "btn--loading": isLoading,
    },
  );

  const buttonStyle = color
    ? { backgroundColor: color, borderColor: color }
    : {};

  return (
    <button
      className={btnClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={buttonStyle}
    >
      {isLoading ? (
        loadingIcon
      ) : (
        <>
          {icon && iconPosition === "start" && (
            <span className="btn-icon">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "end" && (
            <span className="btn-icon">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};
