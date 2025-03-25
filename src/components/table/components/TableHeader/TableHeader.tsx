import { Input, Select } from "src/components";
import { TableHeaderProps } from "./types";

export const TableHeader = <T extends object>({
  columns,
  filters,
  onFilterChange,
  color,
}: TableHeaderProps<T>) => {
  console.log(filters);
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.accessorKey}>
            {column.header}
            {column.filterType === "text" && (
              <Input
                color={color}
                className="input-filter"
                baseSize="small"
                placeholder={`Filter ${column.header}`}
                value={filters[column.accessorKey] || ""}
                onChange={(e) =>
                  onFilterChange(column.accessorKey, e.target.value)
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
                  filters[column.accessorKey]
                    ? {
                        value: filters[column.accessorKey],
                        label: filters[column.accessorKey],
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  onFilterChange(
                    column.accessorKey,
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
