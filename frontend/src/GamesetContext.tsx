import React, { createContext, useState, ReactNode, useContext } from "react";
import { Gameset } from "./classes/Gameset";

interface GamesetContextType {
  activeGame: Gameset | null;
  setActiveGame: (game: Gameset) => void;
}

const GamesetContext = createContext<GamesetContextType | undefined>(undefined);

export const GamesetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeGame, setActiveGame] = useState<Gameset | null>(null);

  return (
    <GamesetContext.Provider value={{ activeGame, setActiveGame }}>
      {children}
    </GamesetContext.Provider>
  );
};

export const useGameset = (): GamesetContextType => {
  const context = useContext(GamesetContext);
  if (!context) {
    throw new Error("useGameset must be used within a GamesetProvider");
  }
  return context;
};
