import { Post } from "src/shared/types/post/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createPost,
  deletePost,
  fetchPostById,
  fetchPosts,
  updatePost,
} from "src/features/post/postThunk";
import { State } from "src/shared/types/types";

export interface PostsState extends State<Post> {
  currentPost: Post | null;
  totalCount: number;
  deletedIds: number[];
}

const initialState: PostsState = {
  items: [],
  currentPost: null,
  status: "idle",
  error: null,
  totalCount: 0,
  deletedIds: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.totalCount = action.payload.length;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch post";
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
        state.totalCount = action.payload.data.length;
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
export const { setPosts, setTotalCount } = postsSlice.actions;
