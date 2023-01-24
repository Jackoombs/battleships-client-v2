import { useContext } from "react";
import { ShipsContext } from "../App";

export const useShipsContext = () => {
  const shipsContext = useContext(ShipsContext);

  if (!shipsContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }
  return shipsContext;
};
