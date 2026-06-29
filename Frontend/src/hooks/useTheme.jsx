import { useContext } from "react";
import { ThemeContextData } from "../contexts/ThemeContext";

const useTheme = () => {
  return useContext(ThemeContextData)
}

export default useTheme
