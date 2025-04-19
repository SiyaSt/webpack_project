import { Theme } from "src/context/types";
import { LOCAL_STORAGE_THEME_KEY } from "src/shared/types/constans/localStorage";

export const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};
