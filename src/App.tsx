import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  NotFoundPage,
  PostPage,
  PostsPage,
  UsersPage,
} from "src/pages";
import { ErrorBoundary, Layout } from "src/components";
import { Provider } from "react-redux";
import { store } from "src/store/store";

export const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="posts/:id" element={<PostPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Provider>
  );
};
