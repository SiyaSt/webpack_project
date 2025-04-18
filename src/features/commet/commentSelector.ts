import { RootState } from "src/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectComments = (state: RootState) => state.comments;

export const selectCommentsData = createSelector(
  selectComments,
  (comments) => ({
    items: comments.items,
    status: comments.status,
    error: comments.error,
  }),
);

export const selectCommentsByPostId = createSelector(
  [selectComments, (state: RootState, postId: number) => postId],
  (comments, postId) => comments.items.filter((c) => c.postId === postId),
);
