import { Input, Select } from "src/components";
import { TableHeaderProps } from "./types";

export const TableHeader = <T extends object>({
  columns,
  filters,
  onFilterChange,
  color,
}: TableHeaderProps<T>) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.accessorKey as string}>
            {column.header}
            {column.filterType === "text" && (
              <Input
                color={color}
                className="input-filter"
                baseSize="small"
                placeholder={`Filter ${column.header}`}
                value={filters[column.accessorKey as string] || ""}
                onChange={(e) =>
                  onFilterChange(column.accessorKey as string, e.target.value)
                }
              />
            )}
            {column.filterType === "select" && column.options && (
              <Select
                className="select-filter"
                size="small"
                variant="underlined"
                color={color}
                options={column.options.map((option) => ({
                  value: option,
                  label: option,
                }))}
                placeholder={`Filter ${column.header}`}
                value={
                  filters[column.accessorKey as string]
                    ? {
                        value: filters[column.accessorKey as string],
                        label: filters[column.accessorKey as string],
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  onFilterChange(
                    column.accessorKey as string,
                    selectedOption?.value || "",
                  )
                }
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};
