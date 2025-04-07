import { Select } from "src/components";
import { fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    size: "medium",
    placeholder: "Select an option...",
    onChange: fn(),
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    color: "primary",
    variant: "outlined",
  },
};

export const WithSelectedValue: Story = {
  args: {
    color: "primary",
    variant: "outlined",
    value: { value: "option2", label: "Option 2" },
  },
};

export const WithFilter: Story = {
  args: {
    color: "primary",
    variant: "outlined",
    filterOption: (option, searchText) =>
      option.label.toLowerCase().includes(searchText.toLowerCase()),
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    variant: "outlined",
  },
};

export const Underlined: Story = {
  args: {
    color: "primary",
    variant: "underlined",
  },
};
