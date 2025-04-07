import { RootState } from "src/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAllComments = (state: RootState) => state.comments.items;
export const selectCommentsByPostId = createSelector(
  [
    (state: RootState) => state.comments.items,
    (state: RootState, postId: number) => postId,
  ],
  (comments, postId) => comments.filter((comment) => comment.postId === postId),
);
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsError = (state: RootState) => state.comments.error;
