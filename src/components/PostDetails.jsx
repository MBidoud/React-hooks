import React, { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Composant d'affichage détaillé d'un post
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.post - Le post à afficher
 * @param {Function} props.onClose - Fonction pour fermer les détails
 * @param {Function} props.onTagClick - Fonction appelée lors du clic sur un tag
 */
function PostDetails({ post, onClose, onTagClick }) {
  // Utiliser le hook useTheme
  const { theme } = useTheme();

  // Utiliser useMemo pour calculer les classes CSS
  const themeClasses = useMemo(
    () => ({
      card: theme === "dark" ? "bg-dark text-light border-secondary" : "",
      badge: theme === "dark" ? "bg-info text-dark" : "bg-secondary",
      button: theme === "dark" ? "btn-outline-light" : "btn-outline-dark",
    }),
    [theme]
  );

  if (!post) return null;

  return (
    <div className={`card mb-4 ${themeClasses.card}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>
        <button
          className={`btn btn-sm ${themeClasses.button}`}
          onClick={onClose}
          aria-label="Fermer"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="card-body">
        {/* Afficher le contenu du post */}
        <p className="card-text">{post.body}</p>

        {/* Afficher les réactions et l'utilisateur */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="me-3">
              <i className="bi bi-hand-thumbs-up-fill text-success"></i>{" "}
              {post.reactions?.likes ?? 0}
            </span>
            <span className="me-3">
              <i className="bi bi-hand-thumbs-down-fill text-danger"></i>{" "}
              {post.reactions?.dislikes ?? 0}
            </span>
            {post.userId && (
              <span>
                <i className="bi bi-person"></i> Utilisateur #{post.userId}
              </span>
            )}
          </div>
        </div>

        {/* Afficher les tags */}
        {post.tags && post.tags.length > 0 && (
          <div>
            <strong>Tags:</strong>
            <div className="mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`badge ${themeClasses.badge} me-1 mb-1`}
                  style={{ cursor: "pointer" }}
                  onClick={() => onTagClick && onTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Utiliser React.memo pour optimiser les rendus
export default React.memo(PostDetails);
