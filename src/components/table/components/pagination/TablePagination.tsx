import { TablePaginationProps } from "./types";
import { FC } from "react";
import { Button } from "src/components";
import "./TablePagination.scss";

export const TablePagination: FC<TablePaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  color,
}) => {
  return (
    <div className="table-pagination">
      <Button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        color={color}
      >
        First
      </Button>
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        color={color}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        color={color}
      >
        Next
      </Button>
      <Button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        color={color}
      >
        Last
      </Button>
    </div>
  );
};
