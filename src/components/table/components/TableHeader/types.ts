import { Color } from "src/shared/types/types";
import { Column } from "src/components/table/types";

export interface TableHeaderProps<T> {
  columns: Column<T>[];
  filters: { [key: string]: string };
  onFilterChange: (columnKey: string, value: string) => void;
  color: Color;
}
