import { User } from "src/shared/types/user";
import { API } from "./client";

export const usersApi = {
  fetchAll: () => API.get<User[]>("/users"),
  fetchById: (id: number) => API.get<User>(`/users/${id}`),
};
