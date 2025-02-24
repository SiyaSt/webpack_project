import { FC, ReactNode } from "react";
import { Type } from "src/shared/types/types";
import "./Modal.scss";
import { classNames } from "src/shared/utils/ClassName";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  typeFirst?: Type;
  typeSecond?: Type;
}

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
