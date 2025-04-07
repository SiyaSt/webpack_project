import { RootState } from "src/store/store";

export const selectAllPosts = (state: RootState) => state.posts.items;
export const selectPostById = (id: number) => (state: RootState) =>
  state.posts.items.find((post) => post.id === id);
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;
