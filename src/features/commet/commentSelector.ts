import { RootState } from "src/store/store";

export const selectAllComments = (state: RootState) => state.comments.items;
export const selectCommentsByPostId = (postId: number) => (state: RootState) =>
  state.comments.items.filter((comment) => comment.postId === postId);
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsError = (state: RootState) => state.comments.error;
