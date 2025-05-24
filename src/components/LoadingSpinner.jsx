import React from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Composant d'indicateur de chargement
 */
function LoadingSpinner() {
  // Utiliser le hook useTheme
  const { theme } = useTheme();

  return (
    <div className="d-flex justify-content-center my-4">
      <div
        className={`spinner-border ${theme === "dark" ? "text-light" : ""}`}
        role="status"
      >
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );
}

export default React.memo(LoadingSpinner);
