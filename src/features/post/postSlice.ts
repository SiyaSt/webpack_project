import { Post } from "src/shared/types/post/post";
import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  deletePost,
  fetchPosts,
  updatePost,
} from "src/features/post/postThunk";

interface PostsState {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalCount: number;
}

const initialState: PostsState = {
  items: [],
  status: "idle",
  error: null,
  totalCount: 0,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (post) => post.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export default postsSlice.reducer;
