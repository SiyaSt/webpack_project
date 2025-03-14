import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "src/components";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
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
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;
export const Primary: Story = {
  args: {
    children: "Primary Checkbox",
    color: "primary",
    size: "medium",
  },
};
