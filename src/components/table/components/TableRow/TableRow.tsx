import { TableRowProps } from "./types";

export const TableRow = <T extends object>({
  item,
  columns,
  onClick,
}: TableRowProps<T>) => {
  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <tr onClick={handleClick}>
      {columns.map((column) => (
        <td key={column.accessorKey}>{String(item[column.accessorKey])}</td>
      ))}
    </tr>
  );
};
