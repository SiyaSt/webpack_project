import { Type } from "src/shared/types/types";

export interface Column<T> {
  header: string;
  accessorKey: Extract<keyof T, string>;
  filterType?: "text" | "number" | "select";
  options?: string[] | undefined;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  type?: Type;
}
