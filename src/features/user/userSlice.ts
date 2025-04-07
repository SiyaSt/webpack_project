import { createSlice } from "@reduxjs/toolkit";
import { User } from "src/shared/types/user";
import { fetchUsers } from "src/features/user/userThunk";

interface UsersState {
  items: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default usersSlice.reducer;
