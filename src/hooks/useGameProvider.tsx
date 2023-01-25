import { useContext } from "react";
import { GameContext } from "../App";

export const useGameContext = () => {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }
  return gameContext;
};
