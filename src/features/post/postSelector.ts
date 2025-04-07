import { RootState } from "src/store/store";

export const selectAllPosts = (state: RootState) => state.posts.items;
export const selectCurrentPost = (state: RootState) => state.posts.currentPost;

export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;
