import { useState, useEffect } from 'react';

export function useFavorites(key) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(key);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [key]);
  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const isItemInFavorites = prevFavorites.some((favorite) => favorite.id === item.id);
  
      if (isItemInFavorites) {
        const updatedFavorites = prevFavorites.filter((favorite) => favorite.id !== item.id);
        localStorage.setItem(key, JSON.stringify(updatedFavorites));
        return updatedFavorites;
      } else {
        const updatedFavorites = [...prevFavorites, item];
        localStorage.setItem(key, JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
    });
  };
  
  
  return [favorites, toggleFavorite];
}
