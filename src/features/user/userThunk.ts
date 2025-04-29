import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersApi } from "src/api/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await usersApi.fetchAll();
  return response.data;
});
