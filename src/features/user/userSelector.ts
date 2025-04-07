import { RootState } from "src/store/store";

export const selectAllUsers = (state: RootState) => state.users.items;
export const selectUserById = (userId: number) => (state: RootState) =>
  state.users.items.find((user) => user.id === userId);
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;
