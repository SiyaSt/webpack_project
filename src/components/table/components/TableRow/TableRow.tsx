import { TableRowProps } from "./types";

export const TableRow = <T extends object>({
  item,
  columns,
}: TableRowProps<T>) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.accessorKey as string}>
          {String(item[column.accessorKey])}
        </td>
      ))}
    </tr>
  );
};
