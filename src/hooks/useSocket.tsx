import { useEffect, useState } from "react";
import io from "socket.io-client";
import { GameType } from "./useGame";

const socket = io(import.meta.env.VITE_SOCKET_URL);
interface Props {
  game: GameType;
}

export const useSocket = ({ game }: Props) => {
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
      console.log(playerShipsReady);
      if (playerShipsReady) {
        socket.emit("beginGame", room);
      }
    });

    return () => {
      socket.off("updateGamePhase");
      socket.off("connectToRoom");
      socket.off("disconnectFromRoom");
      socket.off("checkPlayerReady");
    };
  }, [playerShipsReady]);

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

  return {
    socket,
    room,
    setRoom,
    requestRoom,
    disconnectFromRoom,
    playerShipsReady,
    setPlayerShipsReady,
    checkOpponentReady,
  };
};

export type SocketType = ReturnType<typeof useSocket>;
