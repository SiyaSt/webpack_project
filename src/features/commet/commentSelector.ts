import { RootState } from "src/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectComments = (state: RootState) => state.comments;
export const selectCommentsByPostId = createSelector(
  [selectComments, (_: RootState, postId: number) => postId],
  (comments, postId) => comments.items.filter((c) => c.postId === postId),
);
