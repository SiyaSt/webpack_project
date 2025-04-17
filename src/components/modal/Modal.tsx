import { FC } from "react";
import { ModalProps } from "./types";
import { Button } from "src/components";
import { createPortal } from "react-dom";
import { classNames } from "src/shared/utils/ClassName";
import { useTheme } from "src/hooks/useTheme";
import "./Modal.scss";

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  children,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  colorPrimaryButton = "primary",
  colorSecondaryButton = "primary",
  className,
  disabledPrimaryButton,
}) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={classNames("modal-overlay", className)}>
      <div className={classNames("modal")}>
        <div className="modal--header">
          <div className="modal--header-content">{header}</div>
          <Button
            className="modal--close-button"
            onClick={onClose}
            variant="text"
            size="large"
          >
            &times;
          </Button>
        </div>
        <div className="modal--body">{children}</div>
        {(primaryButtonText || secondaryButtonText) && (
          <div className="modal--footer">
            {secondaryButtonText && (
              <Button
                className="modal--button"
                color={colorSecondaryButton}
                onClick={onSecondaryButtonClick || onClose}
              >
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && (
              <Button
                className="modal--button"
                color={colorPrimaryButton}
                onClick={onPrimaryButtonClick}
                disabled={disabledPrimaryButton}
              >
                {primaryButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
