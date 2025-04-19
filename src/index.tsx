import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "src/App";
import { ThemeProvider } from "src/context/provider";
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ThemeProvider>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);
