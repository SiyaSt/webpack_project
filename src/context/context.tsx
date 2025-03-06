import { createContext } from "react";
import { ThemeContextProps } from "src/context/types";

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});
