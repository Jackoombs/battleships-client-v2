import { useState } from "react";
import { generate2DArray } from "../utils";
import { ShipsType } from "./useShips";

interface Props {
  ships: ShipsType;
}

export const useGame = ({ ships }: Props) => {
  type Ship = ShipsType["ships"][0];

  const [gamePhase, setGamePhase] = useState<
    "lobby" | "planning" | "battle" | "result"
  >("lobby");
  const [userBoard, setUserBoard] = useState(generate2DArray(10));

  const placeShip = (id: Ship["id"], coordinates: Ship["coordinates"]) => {
    const newBoard = [...userBoard];
    for (const coord of coordinates) {
      const [x, y] = coord;
      newBoard[x][y] = id;
    }
    setUserBoard(newBoard);
    ships.setCoordinates(id, coordinates);
  };

  const removeShip = (id: Ship["id"]) => {
    const newBoard = [...userBoard];
    const ship = ships.getShipByID(id);
    if (!ship) {
      return;
    }
    const shipCoordinates = ship.coordinates;
    for (const coord of shipCoordinates) {
      const [x, y] = coord;
      newBoard[x][y] = 0;
    }
    setUserBoard(newBoard);
    ships.setCoordinates(ship.id, []);
  };

  const placementIsValid = (coordinates: Ship["coordinates"]) => {
    for (const coord of coordinates) {
      const [x, y] = coord;
      if (typeof userBoard[x][y] === "string") {
        return false;
      }
    }
    return true;
  };

  return {
    userBoard,
    gamePhase,
    setGamePhase,
    placementIsValid,
    placeShip,
    removeShip,
  };
};

export type GameType = ReturnType<typeof useGame>;
