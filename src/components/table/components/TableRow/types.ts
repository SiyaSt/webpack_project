import { Column } from "src/components/table/types";

export interface TableRowProps<T> {
  item: T;
  columns: Column<T>[];
}
