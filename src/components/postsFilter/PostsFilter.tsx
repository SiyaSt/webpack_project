import { Input, Select } from "src/components";
import { Option } from "src/shared/types/types";
import { classNames } from "src/shared/utils";
import "./PostsFilter.scss";
import { memo } from "react";

interface PostsFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedAuthorId: number | null;
  onAuthorChange: (id: number | null) => void;
  authorOptions: Option[];
  className?: string;
}

export const PostsFilter = memo(
  ({
    searchValue,
    onSearchChange,
    selectedAuthorId,
    onAuthorChange,
    authorOptions,
    className,
  }: PostsFilterProps) => {
    const handleAuthorSelect = (option: Option | null) => {
      onAuthorChange(option ? Number(option.value) : null);
    };
    const handleFilterOptions = (option: Option, searchText: string) => {
      return option.label.toLowerCase().includes(searchText.toLowerCase());
    };
    const selectedAuthor = authorOptions.find(
      (option) => option.value === String(selectedAuthorId),
    );

    return (
      <div className={classNames("posts-filter", className)}>
        <Input
          placeholder="Search by title..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          color="secondary"
          className="posts-filter-input"
        />

        <Select
          options={authorOptions}
          value={selectedAuthor}
          onChange={handleAuthorSelect}
          placeholder="All authors"
          filterOption={handleFilterOptions}
          color="secondary"
          variant="filled"
          size="large"
        />
      </div>
    );
  },
);
