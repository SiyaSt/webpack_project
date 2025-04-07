import { Color } from "src/shared/types/types";
import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  children: ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  colorPrimaryButton?: Color;
  colorSecondaryButton?: Color;
  className?: string;
}
