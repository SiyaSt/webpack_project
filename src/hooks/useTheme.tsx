import { useContext } from "react";
import { ThemeContext } from "src/context/context";

export const useTheme = () => useContext(ThemeContext);
