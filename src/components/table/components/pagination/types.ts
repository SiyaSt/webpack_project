import { Color } from "src/shared/types/types";

export interface TablePaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  color: Color;
}
