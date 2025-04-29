import { useCallback, useEffect, useMemo, useState } from "react";
import { ShortUserInformation, User } from "src/shared/types/user";
import { fetchUsers } from "src/features/user/userThunk";
import { Input, Loader, Table, UserDetailsSidebar } from "src/components";
import { selectUsers } from "src/features/user/userSelector";
import { useAppDispatch, useAppSelector, useDebounce } from "src/hooks";
import { DEBOUNCE, COLUMNS } from "src/shared/constants";
import { mapToShortInfo } from "src/shared/utils";
import "./UsersPage.scss";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { items: users, status, error } = useAppSelector(selectUsers);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  const handleRowClick = useCallback(
    (shortUser: ShortUserInformation) => {
      const selected = users.find((u) => u.email === shortUser.email);
      if (selected) {
        setSelectedUser(selected);
      }
    },
    [users],
  );
  const filteredShortUsers = useMemo(
    () => mapToShortInfo(filteredUsers),
    [filteredUsers],
  );

  return (
    <div className="users-page">
      <div className="search-container">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          color="secondary"
        />
      </div>

      {status === "loading" && <Loader type="secondary" className="loader" />}
      {error && <div>Error: {error}</div>}

      {!error && status !== "loading" && (
        <Table
          data={filteredShortUsers}
          columns={COLUMNS}
          onRowClick={handleRowClick}
          type="secondary"
        />
      )}

      {selectedUser && (
        <UserDetailsSidebar
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UsersPage;
