import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Créer le contexte
const ThemeContext = createContext();

/**
 * Provider pour le contexte de thème
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Enfants du provider
 */
export function ThemeProvider({ children }) {
  // Utiliser useLocalStorage pour persister le thème
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Valeur fournie par le contexte
  const value = {
    theme,
    isDark: theme === "dark",
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte de thème
 * @returns {Object} Contexte de thème
 */
export function useTheme() {
  // Utiliser le contexte et vérifier s'il est disponible
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useTheme doit être utilisé à l'intérieur d'un ThemeProvider"
    );
  }

  return context;
}

export default ThemeContext;
