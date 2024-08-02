'use client';

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Character } from '@/entities/character';

interface IFavoritesContext {
  favorites: Character[];
  showFavorites: boolean;
  updateFavorites: (character: Character) => void;
  setShowFavorites: Dispatch<SetStateAction<boolean>>;
}

export const FavoritesContext = createContext<IFavoritesContext | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const updateFavorites = (character: Character) => {
    const nameFound = favorites.find(
      (favorite) => favorite.name === character.name
    );

    setFavorites(
      nameFound
        ? favorites.filter((favorite) => favorite.name !== character.name)
        : [...favorites, character]
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, showFavorites, setShowFavorites, updateFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
