'use client';

import React, { createContext, useState } from 'react';

interface IFavoritesContext {
  favIds: number[];
  updateFavIds: (id: number) => void;
}

export const FavoritesContext = createContext<IFavoritesContext | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favIds, setFavIds] = useState<number[]>([]);
  const updateFavIds = (id: number) => {
    const idFound = favIds.find((savedId) => savedId === id);
    setFavIds(
      idFound ? favIds.filter((savedId) => savedId !== id) : [...favIds, id]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favIds, updateFavIds }}>
      {children}
    </FavoritesContext.Provider>
  );
}
