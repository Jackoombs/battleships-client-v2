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
  highlightColor: string | undefined;
  highlightedTiles: [number, number][];
  placeShip: () => void;
}

export function PlanningTile({
  x,
  y,
  tileStatus,
  setLastHoveredTile,
  updateHighlightedTiles,
  highlightColor,
  highlightedTiles,
  placeShip,
}: Props) {
  const ships = useShipsContext();
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
    if (typeof tileStatus === "string") {
      return ships.getShipByID(tileStatus)?.color;
    }
    return x % 2 === y % 2 ? "bg-teal-100" : "bg-teal-300";
  };

  return (
    <button
      className={clsx(
        "aspect-square w-full md:w-14 lg:w-16 border-cyan-800 border sm:border-2 duration-100 rounded sm:rounded-lg",
        isHighlighted(highlightedTiles, [x, y]) && ships.getActiveShip()
          ? ships.getActiveShip()?.highlightColor
          : tileColor(x, y)
      )}
      onClick={placeShip}
      onPointerEnter={() => {
        setLastHoveredTile([x, y]);
        updateHighlightedTiles([x, y]);
      }}
    >
      {`${x}, ${y}`}
    </button>
  );
}
