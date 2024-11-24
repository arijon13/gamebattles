"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FavouritesContextProps {
  favourites: string[];
  toggleFavourite: (gameName: string) => void;
}

const FavouritesContext = createContext<FavouritesContextProps | undefined>(undefined);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<string[]>([]);

  const toggleFavourite = (gameName: string) => {
    setFavourites((prev) =>
      prev.includes(gameName)
        ? prev.filter((name) => name !== gameName)
        : [...prev, gameName]
    );
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
