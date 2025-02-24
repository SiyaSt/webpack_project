import { FC } from "react";
import { classNames } from "src/shared/utils/ClassName";
import { ModalProps } from "src/components/modal/types";
import "./Modal.scss";

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  children,
  primaryButtonText = "OK",
  secondaryButtonText = "Cancel",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  typeFirst = "primary",
  typeSecond = "primary",
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal--header">
          {header}
          <button className="modal--close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal--body">{children}</div>
        {(footer || primaryButtonText || secondaryButtonText) && (
          <div className="modal--footer">
            {footer}
            {secondaryButtonText && (
              <button
                className={classNames(
                  "modal--button",
                  `modal--button--${typeFirst}`,
                )}
                onClick={onSecondaryButtonClick || onClose}
              >
                {secondaryButtonText}
              </button>
            )}
            {primaryButtonText && (
              <button
                className={classNames(
                  "modal--button",
                  `modal--button--second--${typeSecond}`,
                )}
                onClick={onPrimaryButtonClick}
              >
                {primaryButtonText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
