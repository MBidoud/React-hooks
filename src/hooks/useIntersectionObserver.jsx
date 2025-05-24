import { useState, useEffect, useRef } from "react";

/**
 * Hook personnalisé pour détecter quand un élément devient visible dans le viewport
 * @param {Object} options - Options pour l'IntersectionObserver
 * @param {boolean} options.enabled - Est-ce que l'observer est actif
 * @param {number} options.threshold - Seuil de visibilité de l'élément (0 à 1)
 * @param {string} options.rootMargin - Marge autour de la racine
 * @returns {[React.RefObject, boolean]} Référence à attacher à l'élément et état d'intersection
 */
function useIntersectionObserver({
  enabled = true,
  threshold = 0.1,
  rootMargin = "0px",
} = {}) {
  // Créer un état pour suivre l'intersection
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Créer une référence pour l'élément à observer
  const ref = useRef(null);

  // Configurer l'IntersectionObserver dans un useEffect
  useEffect(() => {
    if (!enabled) {
      setIsIntersecting(false);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Créer l'observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Mettre à jour l'état quand l'élément entre/sort du viewport
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    // Observer l'élément
    observer.observe(element);

    // Nettoyer l'observer
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [enabled, rootMargin, threshold, ref]);

  return [ref, isIntersecting];
}

export default useIntersectionObserver;
