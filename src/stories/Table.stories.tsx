import { Table } from "src/components";
import { Meta, StoryObj } from "@storybook/react";
import { Column } from "src/components/table/types";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
  },
  {
    id: 3,
    name: "Mike Brown",
    email: "mike.brown@example.com",
    role: "Viewer",
  },
  {
    id: 4,
    name: "Lucy Green",
    email: "lucy.green@example.com",
    role: "Admin",
  },
  {
    id: 5,
    name: "David Black",
    email: "david.black@example.com",
    role: "Editor",
  },
  {
    id: 6,
    name: "Laura White",
    email: "laura.white@example.com",
    role: "Viewer",
  },
  {
    id: 7,
    name: "Simon Grey",
    email: "simon.grey@example.com",
    role: "Admin",
  },
  {
    id: 8,
    name: "Alice Blue",
    email: "alice.blue@example.com",
    role: "Editor",
  },
  {
    id: 9,
    name: "Peter Red",
    email: "peter.red@example.com",
    role: "Viewer",
  },
  {
    id: 10,
    name: "Olivia Purple",
    email: "olivia.purple@example.com",
    role: "Admin",
  },
  {
    id: 11,
    name: "Daniel Orange",
    email: "daniel.orange@example.com",
    role: "Editor",
  },
  {
    id: 12,
    name: "Emily Yellow",
    email: "emily.yellow@example.com",
    role: "Viewer",
  },
];

const columns: Column<User>[] = [
  { header: "ID", accessorKey: "id", filterType: "number" },
  { header: "Name", accessorKey: "name", filterType: "text" },
  { header: "Email", accessorKey: "email", filterType: "text" },
  {
    header: "Role",
    accessorKey: "role",
    options: ["Admin", "Editor", "Viewer"],
    filterType: "select",
  },
];

const columnsWithoutFilters: Column<User>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  {
    header: "Role",
    accessorKey: "role",
    options: ["Admin", "Editor", "Viewer"],
  },
];

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    data: users,
    columns: columns as Column<object>[],
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {};

export const DefaultWithoutFilters: Story = {
  args: {
    columns: columnsWithoutFilters as Column<object>[],
  },
};

export const SecondaryType: Story = {
  args: {
    type: "secondary",
  },
};

export const SmallPageSize: Story = {
  args: {
    pageSize: 5,
  },
};
