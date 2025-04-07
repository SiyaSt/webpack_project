import { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "src/components";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    size: "medium",
    onChange: fn(),
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    defaultValue: "option1",
    color: "primary",
  },
};

export const Horizontal: Story = {
  args: {
    defaultValue: "option1",
    color: "primary",
    direction: "horizontal",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "option1",
    color: "primary",
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    defaultValue: "option1",
    color: "secondary",
  },
};
