import React, { useState, useMemo, useCallback } from "react";
import { TableProps } from "src/components/table/types";
import { Button } from "src/components";
import {
  TableHeader,
  TablePagination,
  TableRow,
} from "src/components/table/components";
import "./Table.scss";
import { classNames } from "src/shared/utils/ClassName";

export const Table = <T extends object>({
  data,
  columns,
  pageSize = 10,
  type = "primary",
  className,
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
    <div className={classNames("table-container", className)}>
      <table className={`table table--${type}`}>
        <TableHeader
          color={type}
          columns={columns}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <tbody>
          {paginatedData.map((item, index) => (
            <TableRow key={index} item={item} columns={columns} />
          ))}
        </tbody>
      </table>
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        color={type}
      />
      <Button
        className="table-clear-filters"
        onClick={clearFilters}
        color={type}
        disabled={Object.keys(filters).length === 0}
      >
        Clear Filters
      </Button>
    </div>
  );
};
