import { Route, Routes } from "react-router-dom";
import { About, HomePage } from "src/pages";
import { Layout } from "src/components";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};
