import React, { useCallback, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Composant d'affichage de la liste des posts
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.posts - Liste des posts à afficher
 * @param {boolean} props.loading - Indicateur de chargement
 * @param {boolean} props.hasMore - Indique s'il y a plus de posts à charger
 * @param {Function} props.onLoadMore - Fonction pour charger plus de posts
 * @param {Function} props.onPostClick - Fonction appelée au clic sur un post
 * @param {Function} props.onTagClick - Fonction appelée au clic sur un tag
 * @param {boolean} props.infiniteScroll - Mode de défilement infini activé ou non
 */
function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true,
}) {
  // Utiliser le hook useTheme
  const { theme, isDark } = useTheme();

  // Utiliser useIntersectionObserver pour le défilement infini
  const [loaderRef, isVisible] = useIntersectionObserver({
    enabled: infiniteScroll && hasMore && !loading,
    rootMargin: "200px",
  });

  // Effect to load more posts when the loader becomes visible
  useEffect(() => {
    if (isVisible && infiniteScroll && hasMore && !loading) {
      onLoadMore();
    }
  }, [isVisible, infiniteScroll, hasMore, loading, onLoadMore]);

  // Utiliser useCallback pour les gestionnaires d'événements
  const handlePostClick = useCallback(
    (post) => {
      if (onPostClick) {
        onPostClick(post);
      }
    },
    [onPostClick]
  );
  const handleTagClick = useCallback(
    (e, tag) => {
      e.stopPropagation(); // Éviter de déclencher le clic sur le post
      if (onTagClick) {
        onTagClick(tag);
      }
    },
    [onTagClick]
  );
  // Gérer le cas où il n'y a pas de posts
  if (!loading && posts.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        Aucun article trouvé. Essayez d'autres termes de recherche.
      </div>
    );
  }
  return (
    <div className="post-list">
      {/* Afficher la liste des posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className={`card mb-3 cursor-pointer ${
            theme === "dark" ? "bg-dark text-light border-secondary" : ""
          }`}
          onClick={() => handlePostClick(post)}
        >
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body.substring(0, 150)}...</p>
            <div className="d-flex gap-1">
              {post.tags.map((tag) => (
                <span
                  key={`${post.id}-${tag}`}
                  className={`badge ${
                    theme === "dark" ? "bg-info" : "bg-secondary"
                  } me-1`}
                  onClick={(e) => handleTagClick(e, tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Afficher le spinner de chargement */}
      {loading && <LoadingSpinner />}
      {/* Ajouter la référence pour le défilement infini */}
      {infiniteScroll && hasMore && (
        <div ref={loaderRef} className="text-center py-2">
          {!loading && (
            <p className="text-muted">
              Faire défiler pour charger plus d'articles
            </p>
          )}
        </div>
      )}

      {/* Ajouter le bouton "Charger plus" pour le mode non-infini */}
      {!infiniteScroll && hasMore && !loading && (
        <div className="d-flex justify-content-center my-4">
          <button className="btn btn-primary" onClick={onLoadMore}>
            Charger plus d'articles
          </button>
        </div>
      )}
    </div>
  );
}

// Utiliser React.memo pour optimiser les rendus
export default React.memo(PostList);
