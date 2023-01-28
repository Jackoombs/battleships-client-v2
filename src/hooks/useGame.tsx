import { useState } from "react";
import { generate2DArray } from "../utils";
import type {
  ShipId,
  PlanningTileType,
  PlayerTileType,
  OpponentTileType,
} from "../vite-env";
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
  const [planningBoard, setPlanningBoard] = useState<PlanningTileType[][]>(
    generate2DArray(10)
  );
  const [playerBoard, setPlayerBoard] = useState<PlayerTileType[][]>(
    generate2DArray(10)
  );
  const [opponentBoard, setOpponentBoard] = useState<OpponentTileType[][]>(
    generate2DArray(10)
  );

  const placeShip = (id: ShipId, coordinates: Ship["coordinates"]) => {
    const newBoard = [...planningBoard];
    for (const coord of coordinates) {
      const [x, y] = coord;
      newBoard[x][y] = id;
    }
    setPlayerBoard(newBoard);
    ships.setCoordinates(id, coordinates);
  };

  const removeShip = (id: ShipId) => {
    const newBoard = [...planningBoard];
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

  const setPlayerBoardOnGameStart = () => {
    setPlayerBoard(planningBoard);
  };

  const setTileLoading = (coord: [number, number]) => {
    const newBoard = [...opponentBoard];
    const [x, y] = coord;
    newBoard[x][y] = "L";
    setOpponentBoard(newBoard);
  };

  const fireResult = (coord: [number, number], hitOrMiss: "H" | "M") => {
    const newBoard = [...opponentBoard];
    const [x, y] = coord;
    newBoard[x][y] = hitOrMiss;
    setOpponentBoard(newBoard);
  };

  const checkIsHit = (coord: [number, number]) => {
    const [x, y] = coord;
    const tile = playerBoard[x][y];
    const isHit = typeof tile === "string" && tile !== "H" && tile !== "M";
    if (isHit) {
      const ship = ships.getShipByID(tile);
    }
  };

  return {
    planningBoard,
    playerBoard,
    opponentBoard,
    setPlayerBoardOnGameStart,
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
