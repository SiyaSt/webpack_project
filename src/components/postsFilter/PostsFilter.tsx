import { Input, Select } from "src/components";
import { Option } from "src/shared/types/types";
import { classNames } from "src/shared/utils/ClassName";
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

const areEqual = (prev: PostsFilterProps, next: PostsFilterProps) =>
  prev.searchValue === next.searchValue &&
  prev.selectedAuthorId === next.selectedAuthorId &&
  prev.authorOptions === next.authorOptions &&
  prev.className === next.className &&
  prev.onSearchChange === next.onSearchChange &&
  prev.onAuthorChange === next.onAuthorChange;

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
          filterOption={(option, searchText) =>
            option.label.toLowerCase().includes(searchText.toLowerCase())
          }
          color="secondary"
          variant="filled"
          size="large"
        />
      </div>
    );
  },
  areEqual,
);
