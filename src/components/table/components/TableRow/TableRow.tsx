import { TableRowProps } from "./types";

export const TableRow = <T extends object>({
  item,
  columns,
}: TableRowProps<T>) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.accessorKey}>{String(item[column.accessorKey])}</td>
      ))}
    </tr>
  );
};
