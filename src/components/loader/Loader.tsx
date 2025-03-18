import { classNames } from "src/shared/utils/ClassName";
import { FC } from "react";
import { LoaderProps } from "src/components/loader/types";
import "./Loader.scss";

export const Loader: FC<LoaderProps> = ({
  type = "primary",
  size = "medium",
  speed = "normal",
  variant = "spinner",
  label = "text",
  className,
}) => {
  return (
    <div className="loader-container">
      <div
        className={classNames(
          "loader",
          `loader--${variant}`,
          `loader--${type}`,
          `loader--${size}`,
          `loader--${speed}`,
          className,
        )}
      >
        {variant === "spinner" && <div className="loader-inner" />}
        {variant === "dots" && (
          <>
            <div className="dot dot-1" />
            <div className="dot dot-2" />
            <div className="dot dot-3" />
          </>
        )}
        {variant === "bar" && <div className="bar" />}
      </div>
      <span className="loader-label">{label}</span>
    </div>
  );
};
