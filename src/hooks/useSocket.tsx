import { useEffect, useState } from "react";
import io from "socket.io-client";
import { GameType } from "./useGame";

const socket = io(import.meta.env.VITE_SOCKET_URL);
interface Props {
  game: GameType;
}

export const useSocket = ({ game }: Props) => {
  const [room, setRoom] = useState<string | null>(null);

  useEffect(() => {
    socket.on("updateGamePhase", (phase: typeof game.gamePhase) => {
      game.setGamePhase(phase);
      console.log(`Game phase now: ${phase}`);
    });

    socket.on("connectToRoom", (room: string) => {
      setRoom(room);
      console.log(`Connected to room: ${room}`);
    });

    socket.on("disconnectFromRoom", (room: string) => {
      console.log(`Disconnected from room: ${room}`);
    });

    return () => {
      socket.off("updateGamePhase");
      socket.off("connectToRoom");
      socket.off("disconnectFromRoom");
    };
  }, []);

  const requestRoom = (room: string, createOrJoin: "create" | "join") => {
    socket.emit("requestRoom", room, createOrJoin);
  };

  const disconnectFromRoom = (room: string) => {
    socket.emit("disconnectFromRoom", room);
    setRoom(null);
  };

  return { socket, room, setRoom, requestRoom, disconnectFromRoom };
};

export type SocketType = ReturnType<typeof useSocket>;
