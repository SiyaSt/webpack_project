import { RootState } from "src/store/store";

export const selectPosts = (state: RootState) => state.posts;
export const selectCurrentPost = (state: RootState) => state.posts.currentPost;
