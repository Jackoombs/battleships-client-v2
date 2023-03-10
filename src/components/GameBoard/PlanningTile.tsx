import { clsx } from "clsx";
import { useShipsContext } from "../../hooks/useShipsContext";
import { PlanningTileType } from "../../vite-env";

interface Props {
  x: number;
  y: number;
  tileStatus: PlanningTileType;
  setLastHoveredTile: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
  updateHighlightedTiles: (tile: [number, number]) => void;
  areHighlightedTilesValid: boolean;
  highlightedTiles: [number, number][];
  handleClick: (tileStatus: PlanningTileType) => void;
}

export function PlanningTile({
  x,
  y,
  tileStatus,
  setLastHoveredTile,
  areHighlightedTilesValid,
  updateHighlightedTiles,
  highlightedTiles,
  handleClick,
}: Props) {
  const ships = useShipsContext();
  const activeShip = ships.getActiveShip();
  const isHighlighted = (
    arr: [number, number][],
    target: [number, number]
  ): boolean => {
    return arr.some((subArr) => subArr.every((val, i) => val === target[i]));
  };

  const tileColor = (x: number, y: number) => {
    if (
      !areHighlightedTilesValid &&
      isHighlighted(highlightedTiles, [x, y]) &&
      activeShip
    ) {
      return "bg-gray-600";
    }
    if (typeof tileStatus === "string") {
      return ships.getShipByID(tileStatus)?.color;
    }
    if (isHighlighted(highlightedTiles, [x, y]) && activeShip) {
      return activeShip.highlightColor;
    }
    return x % 2 === y % 2 ? "bg-cyan-200" : "bg-cyan-100";
  };

  const isCursorPointer = () => {
    if (
      (isHighlighted(highlightedTiles, [x, y]) &&
        activeShip &&
        areHighlightedTilesValid) ||
      (typeof tileStatus === "string" && !activeShip)
    ) {
      return "cursor-pointer";
    }
  };

  return (
    <div
      {...{ x, y }}
      className={clsx(
        "tile aspect-square w-full lg:w-14 xl:w-[4.5rem] border-slate-900 border-2 duration-100 rounded sm:rounded-lg",
        tileColor(x, y),
        isCursorPointer()
      )}
      onClick={() => handleClick(tileStatus)}
      onMouseEnter={() => {
        setLastHoveredTile([x, y]);
        updateHighlightedTiles([x, y]);
      }}
      onTouchStart={() => {
        setLastHoveredTile([x, y]);
        updateHighlightedTiles([x, y]);
      }}
    ></div>
  );
}
