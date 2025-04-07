import { Modal } from "src/components";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { ModalProps } from "src/components/modal/types";

const mockActions = {
  onClose: action("modal-closed"),
  onPrimaryButtonClick: action("primary-button-clicked"),
  onSecondaryButtonClick: action("secondary-button-clicked"),
};

const ModalWrapper = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        Toggle Modal
      </button>

      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          mockActions.onClose();
        }}
        onPrimaryButtonClick={() => {
          setIsOpen(false);
          mockActions.onPrimaryButtonClick();
        }}
        onSecondaryButtonClick={() => {
          setIsOpen(false);
          mockActions.onSecondaryButtonClick();
        }}
      />
    </div>
  );
};
const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    header: "Default Modal",
    children: "This is a basic modal content",
    primaryButtonText: "Confirm",
    secondaryButtonText: "Cancel",
    colorPrimaryButton: "primary",
    colorSecondaryButton: "primary",
    ...mockActions,
  },
  render: (args) => <ModalWrapper {...args} />,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {},
};

export const ColoredButtons: Story = {
  args: {
    header: "Colored Buttons",
    colorPrimaryButton: "primary",
    colorSecondaryButton: "danger",
  },
};

export const WithoutButtons: Story = {
  args: {
    primaryButtonText: undefined,
    secondaryButtonText: undefined,
  },
};

export const WithoutOneButton: Story = {
  args: {
    secondaryButtonText: undefined,
  },
};

export const WithoutHeader: Story = {
  args: {
    header: undefined,
  },
};

export const WithScrollContent: Story = {
  args: {
    header: "Long Content Modal",
    children: Array(50)
      .fill(null)
      .map((_, i) => <p key={i}>Scrollable content line {i + 1}</p>),
  },
};
