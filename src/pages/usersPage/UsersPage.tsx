import { useCallback, useEffect, useMemo, useState } from "react";
import { ShortUserInformation, User } from "src/shared/types/user";
import { fetchUsers } from "src/features/user/userThunk";
import { Loader, Table, UserDetailsSidebar } from "src/components";
import { selectUsers } from "src/features/user/userSelector";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { COLUMNS } from "src/shared/constants";
import { mapToShortInfo } from "src/shared/utils";
import "./UsersPage.scss";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { items: users, status, error } = useAppSelector(selectUsers);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRowClick = useCallback(
    (shortUser: ShortUserInformation) => {
      const selected = users.find((u) => u.email === shortUser.email);
      if (selected) {
        setSelectedUser(selected);
      }
    },
    [users],
  );
  const filteredShortUsers = useMemo(() => mapToShortInfo(users), [users]);

  return (
    <div className="users-page">
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
