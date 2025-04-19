import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "src/components";
import Done from "./assets/done-ring-round.svg";
import { CheckboxProps } from "src/components/checkbox/types";
import { useState } from "react";
import { fn } from "@storybook/test";

const CheckboxWithState = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(args.checked || false);

  const handleChange = (isChecked: boolean) => {
    setChecked(isChecked);
    args.onChange?.(isChecked);
  };

  return <Checkbox {...args} checked={checked} onChange={handleChange} />;
};
const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    size: "medium",
    onChange: fn(),
  },
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
  render: (args) => <CheckboxWithState {...args} />,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    color: "primary",
    children: "Checkbox Label",
  },
};

export const WithIcon: Story = {
  args: {
    checked: true,
    disabled: false,
    color: "primary",
    icon: <Done />,
    children: "Checkbox with Icon",
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    color: "primary",
    children: "Disabled Checkbox",
  },
};
