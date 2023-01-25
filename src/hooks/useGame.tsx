import { useState } from "react";

export const useGame = () => {
  const [gamePhase, setGamePhase] = useState<
    "lobby" | "planning" | "battle" | "result"
  >("lobby");

  return {
    gamePhase,
    setGamePhase,
  };
};

export type GameType = ReturnType<typeof useGame>;
