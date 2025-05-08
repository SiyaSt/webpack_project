import { Input, Select } from "src/components";
import { TableHeaderProps } from "./types";
import { useState, useEffect } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import { DEBOUNCE } from "src/shared/constants";

export const TableHeader = <T extends object>({
  columns,
  filters,
  onFilterChange,
  color,
}: TableHeaderProps<T>) => {
  const [localFilters, setLocalFilters] = useState<{ [key: string]: string }>(
    filters,
  );
  const debouncedFilters = useDebounce(localFilters, DEBOUNCE);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    Object.entries(debouncedFilters).forEach(([key, value]) => {
      onFilterChange(key, value);
    });
  }, [debouncedFilters]);

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.accessorKey} className="column">
            {column.header}
            {column.filterType === "text" && (
              <Input
                color={color}
                className="input-filter"
                baseSize="small"
                placeholder={`Filter ${column.header}`}
                value={localFilters[column.accessorKey] || ""}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    [column.accessorKey]: e.target.value,
                  }))
                }
              />
            )}
            {column.filterType === "select" &&
              Array.isArray(column.options) && (
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
