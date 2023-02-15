import clsx from "clsx";
import { useGameContext } from "../../hooks/useGameContext";
import { useSocketContext } from "../../hooks/useSocketContext";
import { OpponentTileType } from "../../vite-env";
import { Loading } from "../ui/Loading";
import { BiTargetLock } from "react-icons/bi";
import { GiFallingBomb } from "react-icons/gi";
import { useState, useEffect } from "react";

interface Props {
  x: number;
  y: number;
  tileStatus: OpponentTileType;
  hoverDisabled: boolean;
  setHoverDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OpponentTile = ({
  x,
  y,
  tileStatus,
  hoverDisabled,
  setHoverDisabled,
}: Props) => {
  const {
    opponentBoard,
    updateOpponentBoard,
    latestTileTarget,
    setLatestTileTarget,
    setPlayerTurn,
    setRoundResultMessage,
  } = useGameContext();
  const { playerFire } = useSocketContext();
  const [isHover, setIsHover] = useState(false);
  const [borderHighlighted, setBorderHighlighted] = useState(false);

  const tileColor = () => {
    if (tileStatus === "M" || tileStatus === "H") {
      return "bg-transparent";
    }
    return x % 2 === y % 2 ? "bg-cyan-200" : "bg-cyan-100";
  };

  const hoverStyle = () => {
    if (tileStatus === 0 && !hoverDisabled) {
      return "cursor-pointer";
    }
  };

  const handleClick = () => {
    if (tileStatus === 0 && !hoverDisabled) {
      updateOpponentBoard([x, y], "L");
      setHoverDisabled(true);
      playerFire([x, y]);
      setTimeout(() => {
        if (opponentBoard[x][y] === "L") {
          updateOpponentBoard([x, y], 0);
          setHoverDisabled(false);
        }
      }, 3000);
    }
  };

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
        setPlayerTurn((curr) => !curr);
        setRoundResultMessage(null);
        setLatestTileTarget(null);
      }, 4000);
    }
  }, [latestTileTarget]);

  return (
    <div
      onClick={handleClick}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      className={clsx(
        "aspect-square w-full lg:w-14 xl:w-[4.5rem] border-2 text-slate-900  duration-100 rounded sm:rounded-lg flex items-center justify-center text-2xl sm:text-4xl xl:text-6xl",
        tileColor(),
        hoverStyle(),
        borderHighlighted
          ? "border-red-500 lg:border-[6px]"
          : "border-slate-900"
      )}
    >
      {tileStatus === "L" && (
        <Loading size="text-2xl sm:text-4xl xl:text-6xl" />
      )}
      {tileStatus === "H" && <BiTargetLock className="text-cyan-200" />}
      {!tileStatus && !hoverDisabled && isHover && <GiFallingBomb />}
    </div>
  );
};
