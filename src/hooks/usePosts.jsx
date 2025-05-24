import { useState, useEffect, useCallback, useMemo } from "react";
import useDebounce from "./useDebounce";

/**
 * Hook personnalisé pour gérer les posts du blog
 * @param {Object} options - Options de configuration
 * @param {string} options.searchTerm - Terme de recherche
 * @param {string} options.tag - Tag à filtrer
 * @param {number} options.limit - Nombre d'éléments par page
 * @param {boolean} options.infinite - Mode de chargement infini vs pagination
 * @returns {Object} État et fonctions pour gérer les posts
 */
function usePosts({
  searchTerm = "",
  tag = "",
  limit = 10,
  infinite = true,
} = {}) {
  // État local pour les posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // États pour la pagination et les posts
  const [totalPosts, setTotalPosts] = useState(0);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // État pour le post sélectionné
  const [selectedPost, setSelectedPost] = useState(null);

  // Utiliser useDebounce pour le terme de recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // Utiliser useCallback pour construire l'URL de l'API
  // Construire l'URL en fonction des filtres
  const buildApiUrl = useCallback(
    (skip = 0) => {
      if (debouncedSearchTerm) {
        return `https://dummyjson.com/posts/search?q=${encodeURIComponent(
          debouncedSearchTerm
        )}&limit=${limit}&skip=${skip}`;
      } else if (tag) {
        return `https://dummyjson.com/posts/tag/${encodeURIComponent(
          tag
        )}?limit=${limit}&skip=${skip}`;
      }
      return `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;
    },
    [debouncedSearchTerm, tag, limit]
  );
  // Fonction pour charger les posts
  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);

      // Reset pagination state if requested
      if (reset) {
        setSkip(0);
        setPosts([]);
      }

      // Déterminer le nombre d'éléments à sauter
      const currentSkip = reset ? 0 : skip;

      // Construire l'URL basée sur les filtres en utilisant la fonction buildApiUrl
      const url = buildApiUrl(currentSkip);

      // Appel API
      const response = await fetch(url);
      const data = await response.json();

      // Mettre à jour les états
      if (reset || currentSkip === 0) {
        setPosts(data.posts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      }

      setTotalPosts(data.total);
      setHasMore(currentSkip + limit < data.total);
      setSkip(currentSkip + limit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Charger les posts quand les filtres changent
  useEffect(() => {
    fetchPosts(true); // Reset quand les filtres changent
  }, [debouncedSearchTerm, tag]);
  // Fonction pour charger plus de posts
  const loadMore = () => {
    if (hasMore && !loading) {
      fetchPosts(false);
    }
  };

  // Utiliser useMemo pour calculer les tags uniques
  const uniqueTags = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags || []);
    return [...new Set(allTags)].sort();
  }, [posts]);

  // Fonction pour charger un post par son ID
  const loadPostById = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
      const data = await response.json();
      setSelectedPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  // Définir la fonction refresh avec useCallback
  const refresh = useCallback(() => {
    fetchPosts(true);
  }, []);
  return {
    posts,
    loading,
    error,
    hasMore,
    totalPosts,
    loadMore,
    refresh,
    uniqueTags,
    selectedPost,
    selectPost: setSelectedPost,
    loadPostById,
    clearSelectedPost: () => setSelectedPost(null),
  };
}

export default usePosts;
