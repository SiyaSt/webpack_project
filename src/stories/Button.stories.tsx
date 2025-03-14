import { Meta, StoryObj } from "@storybook/react";
import { Button } from "src/components";
import LookUp from "./assets/arrow.svg";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    variant: "filled",
    onClick: fn(),
    size: "medium",
  },
  argTypes: {
    loading: {
      control: {
        type: "boolean",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    color: "secondary",
    variant: "outlined",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    color: "danger",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    color: "link",
    variant: "text",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    color: "primary",
    variant: "filled",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    color: "primary",
    variant: "filled",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Button with Icon",
    color: "primary",
    variant: "filled",
    icon: <LookUp />,
    iconPosition: "start",
  },
};
