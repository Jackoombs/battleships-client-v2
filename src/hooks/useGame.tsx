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
  const [roundResultMessage, setRoundResultMessage] = useState<null | string>(
    null
  );
  const [latestTileTarget, setLatestTileTarget] = useState<
    [number, number] | null
  >(null);
  const [isWinner, setIsWinner] = useState(false);

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

  const checkIsHit = (coord: [number, number]) => {
    const [x, y] = coord;
    const tile = planningBoard[x][y];
    return typeof tile === "string";
  };

  const checkIsSunk = (id: ShipId): ShipId | null => {
    const ship = ships.getShipByID(id) as Ship;
    return ship.hits.length === ship.length - 1 ? id : null;
  };

  const checkIsWin = () => {
    for (const ship of ships.ships) {
      if (ship.hits.length !== ship.length) {
        return false;
      }
    }
    return true;
  };

  const updatePlayerBoard = (
    coord: [number, number],
    newTileStatus: PlayerTileType
  ) => {
    const [x, y] = coord;
    const newBoard = [...playerBoard];
    newBoard[x][y] = newTileStatus;
    setPlayerBoard(newBoard);
  };

  const updateOpponentBoard = (
    coord: [number, number],
    newTileStatus: OpponentTileType
  ) => {
    const [x, y] = coord;
    const newBoard = [...opponentBoard];
    newBoard[x][y] = newTileStatus;
    setOpponentBoard(newBoard);
  };

  const updateRoundResultMessage = (isHit: boolean, isSunk: ShipId | null) => {
    if (isSunk) {
      const ship = ships.getShipByID(isSunk)!.name;
      if (playerTurn) {
        return setRoundResultMessage(
          `Great job! You sunk their ${ship}. Your skill and strategy are impressive. Keep it up!`
        );
      } else {
        return setRoundResultMessage(
          `Oh no! Your ${ship} has been sunk in the game. Don't be too hard on yourself, these things happen. Keep your chin up and stay focused on your next move.`
        );
      }
    }
    if (isHit) {
      if (playerTurn) {
        return setRoundResultMessage(
          "Congratulations! You've just hit their ship. Your aim is spot on and your efforts have paid off. Keep it up and keep hitting those tiles."
        );
      } else {
        return setRoundResultMessage(
          "Oh no! Your ship has been hit by an opponent's attack. Don't be discouraged, these things happen and it's just a game. Keep your focus and plan your next move carefully."
        );
      }
    } else {
      if (playerTurn) {
        return setRoundResultMessage(
          "You missed but don't worry. Keep your spirits up and focus on your next shot. Misses are a natural part of the game and with determination and strategy, you can make your next shot count."
        );
      } else {
        return setRoundResultMessage(
          "You managed to dodge the attack, great job! Your defensive skills have paid off and you've successfully avoided an opponent's attack. Keep it up and stay alert. "
        );
      }
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
    checkIsHit,
    checkIsSunk,
    checkIsWin,
    updatePlayerBoard,
    updateOpponentBoard,
    roundResultMessage,
    setRoundResultMessage,
    updateRoundResultMessage,
    latestTileTarget,
    setLatestTileTarget,
    isWinner,
    setIsWinner,
  };
};

export type GameType = ReturnType<typeof useGame>;
