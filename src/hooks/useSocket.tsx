import { useEffect, useState } from "react";
import io from "socket.io-client";
import { ShipId } from "../vite-env";
import { GameType } from "./useGame";
import { ShipsType } from "./useShips";

const socket = io(import.meta.env.VITE_SOCKET_URL);
interface Props {
  game: GameType;
  ships: ShipsType;
}

export const useSocket = ({ game, ships }: Props) => {
  const [room, setRoom] = useState<string | null>(null);
  const [playerShipsReady, setPlayerShipsReady] = useState(false);

  useEffect(() => {
    socket.on(
      "updateGamePhase",
      (phase: typeof game.gamePhase, playerTurn?: boolean | null) => {
        game.setGamePhase(phase);
        if (playerTurn !== undefined) {
          game.setPlayerTurn(playerTurn);
        }
        console.log(`Game phase now: ${phase}`);
      }
    );

    socket.on("connectToRoom", (room: string) => {
      setRoom(room);
      console.log(`Connected to room: ${room}`);
    });

    socket.on("disconnectFromRoom", (room: string) => {
      console.log(`Disconnected from room: ${room}`);
    });

    socket.on("checkPlayerReady", () => {
      if (playerShipsReady) {
        socket.emit("beginGame", room);
      }
    });

    socket.on("opponentReceiveFire", (coord: [number, number]) => {
      console.log("player received fire", coord);
      const [x, y] = coord;
      let isSunk: ShipId | null = null;
      const isHit = game.checkIsHit(coord);
      if (isHit) {
        const shipId = game.playerBoard[x][y] as ShipId;
        isSunk = game.checkIsSunk(shipId);
        ships.updateShipOnHit(shipId, coord);
      }
      return socket.emit("endRound", room, coord, isHit, isSunk);
    });

    socket.on(
      "endRound",
      (coord: [number, number], isHit: boolean, isSunk: ShipId | null) => {
        console.log("end of round", coord, isHit, isSunk);
        if (game.playerTurn) {
          game.updateOpponentBoard(coord, isHit ? "H" : "M");
        } else {
          game.updatePlayerBoard(coord, isHit ? "H" : "M");
        }
        game.updateRoundResultMessage(isHit, isSunk);
        game.setLatestTileTarget(coord);
      }
    );

    socket.on("gameResult", (isWinner: boolean) => {
      game.setGamePhase("result");
      game.setIsWinner(isWinner);
    });

    return () => {
      socket.off("updateGamePhase");
      socket.off("connectToRoom");
      socket.off("disconnectFromRoom");
      socket.off("checkPlayerReady");
      socket.off("opponentReceiveFire");
      socket.off("endRound");
    };
  }, [playerShipsReady, ships, game.planningBoard]);

  const requestRoom = (room: string, createOrJoin: "create" | "join") => {
    socket.emit("requestRoom", room, createOrJoin);
  };

  const disconnectFromRoom = () => {
    socket.emit("disconnectFromRoom", room);
    setRoom(null);
  };

  const checkOpponentReady = () => {
    socket.emit("checkOpponentReady", room);
  };

  const playerFire = (coord: [number, number]) => {
    console.log("player fired", coord);
    socket.emit("playerFire", room, coord);
  };

  const resetGame = () => {
    game.resetGame();
    ships.resetShips();
    setPlayerShipsReady(false);
  };

  return {
    socket,
    room,
    setRoom,
    requestRoom,
    disconnectFromRoom,
    playerShipsReady,
    setPlayerShipsReady,
    checkOpponentReady,
    playerFire,
    resetGame,
  };
};

export type SocketType = ReturnType<typeof useSocket>;
