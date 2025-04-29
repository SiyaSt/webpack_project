import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "src/features/post/postSlice";
import usersReducer from "src/features/user/userSlice";
import commentsReducer from "src/features/commet/commentSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
