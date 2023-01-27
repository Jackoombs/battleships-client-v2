import { useContext } from "react";
import { SocketContext } from "../App";

export const useSocketContext = () => {
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }
  return socketContext;
};
