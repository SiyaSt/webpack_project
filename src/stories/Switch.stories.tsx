import { Switch } from "src/components";
import { fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import Check from "./assets/check.svg";
import Cross from "./assets/cross.svg";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    size: "medium",
    onChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    color: "primary",
    label: "Toggle me",
  },
};

export const WithIcons: Story = {
  args: {
    color: "primary",
    label: "Toggle with icons",
    checkedIcon: <Check />,
    uncheckedIcon: <Cross />,
  },
};

export const Loading: Story = {
  args: {
    color: "primary",
    loading: true,
    label: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    color: "primary",
    disabled: true,
    label: "Disabled",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    label: "Custom color",
  },
};
