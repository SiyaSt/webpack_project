import { Meta, StoryObj } from "@storybook/react";
import { Button } from "src/components";
import LookUp from "./assets/arrow.svg";
import { fn } from "@storybook/test";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    onClick: fn(),
  },
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["primary", "secondary", "danger", "link"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["filled", "outlined", "text"],
      },
    },
    iconPosition: {
      control: {
        type: "select",
        options: ["start", "end"],
      },
    },
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
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    color: "primary",
    size: "medium",
    variant: "filled",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    color: "secondary",
    size: "medium",
    variant: "filled",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    color: "danger",
    size: "medium",
    variant: "filled",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    color: "link",
    size: "medium",
    variant: "text",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    color: "primary",
    size: "medium",
    variant: "filled",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    color: "primary",
    size: "medium",
    variant: "filled",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Button with Icon",
    color: "primary",
    size: "medium",
    variant: "filled",
    icon: <LookUp />,
    iconPosition: "start",
  },
};
