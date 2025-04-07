import { Route, Routes } from "react-router-dom";
import { About, HomePage } from "src/pages";
import { Layout } from "src/components";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { UsersPage } from "src/pages/usersPage/UsersPage";
import { PostsPage } from "src/pages/postsPage/PostsPage";
import { PostPage } from "src/pages/postPage/PostPage";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </Provider>
  );
};
