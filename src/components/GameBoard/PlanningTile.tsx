import { clsx } from "clsx";
import { useShipsContext } from "../../hooks/useShipsProvider";
import { ShipConstructor } from "../../vite-env";

interface Props {
  x: number;
  y: number;
  tileStatus: ShipConstructor["id"] | number;
  setLastHoveredTile: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
  updateHighlightedTiles: (tile: [number, number]) => void;
  areHighlightedTilesValid: boolean;
  highlightColor: string | undefined;
  highlightedTiles: [number, number][];
  placeShip: () => void;
  removeShip: (id: ShipConstructor["id"]) => void;
}

export function PlanningTile({
  x,
  y,
  tileStatus,
  setLastHoveredTile,
  areHighlightedTilesValid,
  updateHighlightedTiles,
  highlightColor,
  highlightedTiles,
  placeShip,
  removeShip,
}: Props) {
  const ships = useShipsContext();
  const activeShip = ships.getActiveShip();
  const isHighlighted = (
    arr: [number, number][],
    target: [number, number]
  ): boolean => {
    if (!highlightColor) {
      return false;
    }
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
    return x % 2 === y % 2 ? "bg-cyan-200" : "bg-teal-300";
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

  const handleClick = () => {
    if (!activeShip && typeof tileStatus === "string") {
      const ship = ships.getShipByID(tileStatus);
      removeShip(tileStatus);
      ships.setActiveShip(ship?.name);
    } else {
      placeShip();
    }
  };

  return (
    <div
      className={clsx(
        "aspect-square w-full md:w-14 lg:w-16 border-cyan-800 border sm:border-2 duration-100 rounded sm:rounded-lg",
        tileColor(x, y),
        isCursorPointer()
      )}
      onClick={handleClick}
      onPointerEnter={() => {
        setLastHoveredTile([x, y]);
        updateHighlightedTiles([x, y]);
      }}
    >
      {`${x}, ${y}`}
    </div>
  );
}
