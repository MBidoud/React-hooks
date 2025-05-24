import React, { useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Composant de recherche de posts
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onSearch - Fonction appelée lors de la saisie
 * @param {Function} props.onTagSelect - Fonction appelée lors de la sélection d'un tag
 * @param {Array} props.availableTags - Liste des tags disponibles
 * @param {string} props.selectedTag - Tag actuellement sélectionné
 */
function PostSearch({
  onSearch,
  onTagSelect,
  availableTags = [],
  selectedTag = "",
}) {
  const [searchInput, setSearchInput] = useState("");
  // Utiliser le hook useTheme
  const { theme } = useTheme();

  // Utiliser useCallback pour optimiser le gestionnaire
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchInput(value);
      onSearch(value);
    },
    [onSearch]
  );

  // Appliquer les classes CSS en fonction du thème
  const themeClasses =
    theme === "dark" ? "bg-dark text-light border-secondary" : "";

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>{" "}
            <input
              type="text"
              className={`form-control ${themeClasses}`}
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
            {searchInput && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setSearchInput("");
                  onSearch("");
                }}
                aria-label="Effacer"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        {/* Sélecteur de tags */}
        <div className="col-md-4">
          <select
            className={`form-select ${themeClasses}`}
            value={selectedTag}
            onChange={(e) => onTagSelect(e.target.value)}
            aria-label="Filtrer par tag"
          >
            <option value="">Tous les tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// Utiliser React.memo pour optimiser les rendus
export default React.memo(PostSearch);
