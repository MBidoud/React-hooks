import React, { useState, useCallback } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostSearch from "./components/PostSearch";
import PostDetails from "./components/PostDetails";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import usePosts from "./hooks/usePosts";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  // État local pour la recherche
  const [searchTerm, setSearchTerm] = useState("");
  // État pour le tag sélectionné
  const [selectedTag, setSelectedTag] = useState("");

  // Utiliser useLocalStorage pour le mode de défilement
  const [infiniteScroll, setInfiniteScroll] = useLocalStorage(
    "infiniteScroll",
    true
  );

  // Utilisation du hook usePosts pour récupérer les posts
  const {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    uniqueTags,
    selectedPost,
    selectPost,
    clearSelectedPost,
  } = usePosts({
    searchTerm,
    tag: selectedTag,
    limit: 10,
    infinite: infiniteScroll,
  });

  // Utiliser useCallback pour les gestionnaires d'événements

  // Gestionnaire pour la recherche avec useCallback
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Gestionnaire pour la sélection de tag
  const handleTagSelect = useCallback((tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? "" : tag));
  }, []);
  // Get theme for applying theme classes to root container
  const { theme } = useTheme();

  return (
    <div
      className={`container py-4 ${
        theme === "dark" ? "bg-dark text-light" : ""
      }`}
    >
      <header className="pb-3 mb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          {" "}
          <h1 className="display-5 fw-bold">Blog</h1>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <PostSearch
          onSearch={handleSearchChange}
          onTagSelect={handleTagSelect}
          availableTags={uniqueTags}
          selectedTag={selectedTag}
        />
        {/* Afficher un message d'erreur si nécessaire */}
        {error && (
          <div className="alert alert-danger" role="alert">
            Erreur: {error}
          </div>
        )}
        {/* Afficher les détails d'un post si un post est sélectionné */}
        {selectedPost && (
          <PostDetails
            post={selectedPost}
            onClose={clearSelectedPost}
            onTagClick={handleTagSelect}
          />
        )}
        {/* Passer les props nécessaires à PostList */}{" "}
        <PostList
          posts={posts}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          infiniteScroll={infiniteScroll}
          onTagClick={handleTagSelect}
          onPostClick={selectPost}
        />
      </main>

      <footer className="pt-3 mt-4 text-center border-top">
        <p>TP React Hooks - Blog &middot; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

// Wrap App with ThemeProvider
function AppWithTheme() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWithTheme;
