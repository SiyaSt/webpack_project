import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  deleteComment,
  fetchCommentsByPostId,
  updateComment,
} from "src/features/commet/commentThunk";
import { Comment } from "src/shared/types/comment/comment";
import { State } from "src/shared/types/types";

const initialState: State<Comment> = {
  items: [],
  status: "idle",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch comments";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (comment) => comment.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (comment) => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
