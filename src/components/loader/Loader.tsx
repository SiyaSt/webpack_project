import { classNames } from "src/shared/utils/ClassName";
import { FC } from "react";
import { LoaderProps } from "src/components/loader/types";
import "./Loader.scss";

export const Loader: FC<LoaderProps> = ({
  type = "primary",
  size = "medium",
  speed = "normal",
  variant = "spinner",
  className,
}) => {
  return (
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
      {variant === "spinner" && <div className="loader-inner"></div>}
      {variant === "dots" && (
        <>
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </>
      )}
      {variant === "bar" && <div className="bar"></div>}
    </div>
  );
};
