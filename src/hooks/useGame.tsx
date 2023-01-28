import { useState } from "react";
import { generate2DArray } from "../utils";
import { ShipConstructor } from "../vite-env";
import { ShipsType } from "./useShips";

interface Props {
  ships: ShipsType;
}

export const useGame = ({ ships }: Props) => {
  type Ship = ShipsType["ships"][0];

  const [playerTurn, setPlayerTurn] = useState<boolean | null>(null);
  const [gamePhase, setGamePhase] = useState<
    "lobby" | "planning" | "battle" | "result"
  >("lobby");
  const [playerBoard, setPlayerBoard] = useState<
    (0 | "H" | "M" | ShipConstructor["id"])[][]
  >(generate2DArray(10));
  const [opponentBoard, setOpponentBoard] = useState<(0 | "H" | "M" | "L")[][]>(
    generate2DArray(10)
  );

  const placeShip = (id: Ship["id"], coordinates: Ship["coordinates"]) => {
    const newBoard = [...playerBoard];
    for (const coord of coordinates) {
      const [x, y] = coord;
      newBoard[x][y] = id;
    }
    setPlayerBoard(newBoard);
    ships.setCoordinates(id, coordinates);
  };

  const removeShip = (id: Ship["id"]) => {
    const newBoard = [...playerBoard];
    const ship = ships.getShipByID(id);
    if (!ship) {
      return;
    }
    const shipCoordinates = ship.coordinates;
    for (const coord of shipCoordinates) {
      const [x, y] = coord;
      newBoard[x][y] = 0;
    }
    setPlayerBoard(newBoard);
    ships.setCoordinates(ship.id, []);
  };

  const placementIsValid = (coordinates: Ship["coordinates"]) => {
    for (const coord of coordinates) {
      const [x, y] = coord;
      if (typeof playerBoard[x][y] === "string") {
        return false;
      }
    }
    return true;
  };

  const setTileLoading = (coord: [number, number]) => {
    const newBoard = [...opponentBoard];
    const [x, y] = coord;
    newBoard[x][y] = "L";
    setOpponentBoard(newBoard);
  };

  return {
    playerBoard,
    opponentBoard,
    gamePhase,
    setGamePhase,
    placementIsValid,
    placeShip,
    removeShip,
    playerTurn,
    setPlayerTurn,
    setTileLoading,
  };
};

export type GameType = ReturnType<typeof useGame>;
