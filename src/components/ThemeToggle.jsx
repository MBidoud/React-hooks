import React from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Composant pour basculer entre les thèmes clair et sombre
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`btn btn-sm ${theme === "dark" ? "btn-light" : "btn-dark"}`}
      onClick={toggleTheme}
      aria-label="Changer de thème"
    >
      {theme === "dark" ? (
        <>
          <i className="bi bi-sun"></i> Mode clair
        </>
      ) : (
        <>
          <i className="bi bi-moon"></i> Mode sombre
        </>
      )}
    </button>
  );
}

export default React.memo(ThemeToggle);
