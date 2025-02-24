import React, { useState, useMemo, useCallback } from "react";
import { TableProps } from "src/components/table/types";
import { TablePagination } from "src/components/table/pagination/TablePagination";
import "./Table.scss";

export const Table = <T extends object>({
  data,
  columns,
  pageSize = 10,
  type = "primary",
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      for (const key in filters) {
        if (
          filters[key] &&
          String(item[key as keyof T])
            .toLowerCase()
            .indexOf(filters[key].toLowerCase()) === -1
        ) {
          return false;
        }
      }
      return true;
    });
  }, [data, filters]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  const handleFilterChange = useCallback((columnKey: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [columnKey]: value }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setCurrentPage(1);
  }, []);

  return (
    <div className="table-container">
      <table className={`table table--${type}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessorKey}>
                {column.header}
                {column.filterType === "text" && (
                  <input
                    type="text"
                    placeholder={`Filter ${column.header}`}
                    value={filters[column.accessorKey as string] || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        column.accessorKey as string,
                        e.target.value,
                      )
                    }
                  />
                )}
                {column.filterType === "select" && column.options && (
                  <select
                    value={filters[column.accessorKey as string] || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        column.accessorKey as string,
                        e.target.value,
                      )
                    }
                  >
                    <option value="">All</option>
                    {column.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessorKey}>
                  {String(item[column.accessorKey])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <button className="table-clear-filters" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};
