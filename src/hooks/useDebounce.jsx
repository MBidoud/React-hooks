import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour débouncer une valeur
 * @param {any} value - La valeur à débouncer
 * @param {number} delay - Le délai en millisecondes
 * @returns {any} La valeur après le délai
 */
function useDebounce(value, delay = 500) {
  // État pour stocker la valeur debouncée
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Configurer un timer pour mettre à jour la valeur debouncée après le délai
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nettoyer le timer si la valeur change à nouveau avant le délai
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
