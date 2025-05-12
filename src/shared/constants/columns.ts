import { Column } from "src/components/table/types";
import { ShortUserInformation } from "src/shared/types/user";

export const COLUMNS: Column<ShortUserInformation>[] = [
  { header: "Name", accessorKey: "name", filterType: "text" },
  { header: "Email", accessorKey: "email" },
  { header: "Company", accessorKey: "company" },
  { header: "Phone", accessorKey: "phone" },
];
