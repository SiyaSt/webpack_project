import { classNames } from "src/shared/utils";
import { FC } from "react";
import { LoaderProps } from "./types";
import "./Loader.scss";

export const Loader: FC<LoaderProps> = ({
  type = "primary",
  size = "medium",
  speed = "normal",
  variant = "spinner",
  label,
  className,
}) => {
  return (
    <div
      className={classNames(
        "loader-container",
        `loader-container--${variant}`,
        className,
      )}
    >
      <div
        className={classNames(
          "loader",
          `loader--${variant}`,
          `loader--${type}`,
          `loader--${size}`,
          `loader--${speed}`,
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
      {label && <span className="loader-label">{label}</span>}
    </div>
  );
};
