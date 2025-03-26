import { Tabs } from "src/components";
import { Meta, StoryObj } from "@storybook/react";
import Icon from "./assets/cloud-moon.svg";

const tabsData = [
  {
    label: "Home",
    content: <p>This is the Home tab content.</p>,
    icon: <Icon />,
  },
  {
    label: "Profile",
    content: <p>This is the Profile tab content.</p>,
    icon: <Icon />,
  },
  {
    label: "Settings",
    content: <p>This is the Settings tab content.</p>,
    icon: <Icon />,
  },
  {
    label: "Disabled",
    content: <p>This tab is disabled.</p>,
    disabled: true,
  },
];

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    size: "medium",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;
export const Default: Story = {
  args: {
    tabs: tabsData,
  },
};

export const BottomPosition: Story = {
  args: {
    tabs: tabsData,
    position: "bottom",
  },
};
export const VerticalOrientation: Story = {
  args: {
    tabs: tabsData,
    orientation: "vertical",
  },
};

export const ActiveTab: Story = {
  args: {
    tabs: tabsData,
    activeTab: 1,
  },
};
