import { Loader } from "src/components";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Loader",
  tags: ["autodocs"],
  component: Loader,
  args: {
    size: "medium",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    variant: "spinner",
  },
};
export const DefaultWithLabel: Story = {
  args: {
    variant: "spinner",
    label: "Loading..",
  },
};
export const Dots: Story = {
  args: {
    variant: "dots",
    label: "Loading..",
  },
};

export const Bar: Story = {
  args: {
    variant: "bar",
    label: "Loading..",
  },
};
