import { Input } from "src/components";
import { fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import Image from "./assets/search.svg";

const meta = {
  title: "Components/Input",
  component: Input,
  args: {
    onSearch: fn(),
    baseSize: "medium",
  },
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    color: "primary",
    onChange: fn(),
    variant: "outlined",
  },
};

export const WithButtonText: Story = {
  args: {
    color: "primary",
    buttonSearchText: "Search",
  },
};

export const WithButtonIcon: Story = {
  args: {
    color: "primary",
    icon: <Image />,
  },
};

export const WithButtonIconAndText: Story = {
  args: {
    color: "primary",
    icon: <Image />,
    buttonSearchText: "Search",
  },
};

export const Loading: Story = {
  args: {
    color: "primary",
    loading: true,
    buttonSearchText: "Search",
  },
};

export const WithError: Story = {
  args: {
    color: "primary",
    errorText: "Error",
    icon: <Image />,
    buttonSearchText: "Search",
  },
};
