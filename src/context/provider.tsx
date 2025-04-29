import { Theme, ThemeProviderProps } from "./types";
import { FC, useLayoutEffect, useState } from "react";
import { ThemeContext } from "./context";
import { getInitialTheme } from "src/shared/utils";
import { LOCAL_STORAGE_THEME_KEY } from "src/shared/constants";

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
