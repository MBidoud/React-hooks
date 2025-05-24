import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer le stockage local
 * @param {string} key - La clé de stockage local
 * @param {any} initialValue - La valeur initiale si rien n'est trouvé dans localStorage
 * @returns {[any, function]} Valeur stockée et fonction pour la mettre à jour
 */
function useLocalStorage(key, initialValue) {
  // Initialiser l'état avec la valeur du localStorage ou la valeur initiale
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Récupérer depuis localStorage
      const item = window.localStorage.getItem(key);
      // Analyser la valeur stockée ou retourner initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération depuis localStorage: ${error}`
      );
      return initialValue;
    }
  });

  // Fonction pour mettre à jour l'état et le localStorage
  const setValue = (value) => {
    try {
      // Permettre à value d'être une fonction comme dans useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Sauvegarder dans l'état
      setStoredValue(valueToStore);

      // Sauvegarder dans localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde dans localStorage: ${error}`);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
