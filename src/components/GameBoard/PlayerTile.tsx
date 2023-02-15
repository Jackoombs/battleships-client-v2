import type { PlayerTileType } from "../../vite-env";
import { useShipsContext } from "../../hooks/useShipsContext";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { BiTargetLock } from "react-icons/bi";
import { useSocketContext } from "../../hooks/useSocketContext";

interface Props {
  x: number;
  y: number;
  tileStatus: PlayerTileType;
}

export const PlayerTile = ({ x, y, tileStatus }: Props) => {
  const { getShipByID } = useShipsContext();
  const {
    setPlayerTurn,
    latestTileTarget,
    setRoundResultMessage,
    setLatestTileTarget,
    checkIsWin,
  } = useGameContext();
  const { socket, room } = useSocketContext();
  const [borderHighlighted, setBorderHighlighted] = useState(false);

  useEffect(() => {
    if (!latestTileTarget) {
      return;
    }
    if (latestTileTarget[0] === x && latestTileTarget[1] === y) {
      const interval = setInterval(() => {
        setBorderHighlighted((curr) => !curr);
      }, 400);
      setTimeout(() => {
        clearInterval(interval);
        const isWin = checkIsWin();
        if (isWin) {
          return socket.emit("isWin", room);
        }
        setPlayerTurn((curr) => !curr);
        setRoundResultMessage(null);
        setLatestTileTarget(null);
        setBorderHighlighted(false);
      }, 4000);
    }
  }, [latestTileTarget]);

  const tileColor = () => {
    if (tileStatus === "M" || tileStatus === "H") {
      return "bg-transparent";
    }
    if (typeof tileStatus === "string") {
      const ship = getShipByID(tileStatus);
      return ship?.color;
    }
    return x % 2 === y % 2 ? "bg-cyan-200" : "bg-cyan-100";
  };

  return (
    <div
      className={clsx(
        "aspect-square w-full lg:w-14 xl:w-[4.5rem] text-slate-900 border-2 duration-100 rounded sm:rounded-lg flex items-center justify-center text-2xl sm:text-4xl xl:text-6xl",
        tileColor(),
        borderHighlighted
          ? "border-red-500 lg:border-[6px]"
          : "border-slate-900"
      )}
    >
      {tileStatus === "H" && <BiTargetLock className="text-cyan-200" />}
    </div>
  );
};
