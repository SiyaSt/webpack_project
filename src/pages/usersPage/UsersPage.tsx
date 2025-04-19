import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShortUserInformation, User } from "src/shared/types/user";
import { useDebounce } from "src/hooks/useDebounce";
import { fetchUsers } from "src/features/user/userThunk";
import { Input, Loader, Table, UserDetailsSidebar } from "src/components";
import { columns } from "src/shared/types/columns";
import { selectUsers } from "src/features/user/userSelector";
import "./UsersPage.scss";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { items: users, status, error } = useAppSelector(selectUsers);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  const handleRowClick = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const mapToShortInfo = (users: User[]): ShortUserInformation[] => {
    return users.map((user) => ({
      name: user.name,
      email: user.email,
      company: user.company.name,
      phone: user.phone,
    }));
  };

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
          columns={columns}
          onRowClick={(user) =>
            handleRowClick(users.find((u) => u.email === user.email) as User)
          }
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
