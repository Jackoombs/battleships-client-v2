import { clsx } from "clsx";
import { getHighlightedTiles } from "../../utils";

interface Props {
  x: number;
  y: number;
  updateHighlightedTiles: (tile: [number, number]) => void;
  highlightColor: string | undefined;
  highlightedTiles: [number, number][];
}

export function PlanningTile({
  x,
  y,
  updateHighlightedTiles,
  highlightColor,
  highlightedTiles,
}: Props) {
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
    return x % 2 === y % 2 ? "bg-teal-200" : "bg-teal-400";
  };

  return (
    <button
      data-x={x}
      data-y={y}
      className={clsx(
        "aspect-square w-full md:w-14 lg:w-16 border-cyan-900 border sm:border-2 duration-100 rounded sm:rounded-lg",
        isHighlighted(highlightedTiles, [x, y])
          ? highlightColor
          : tileColor(x, y)
      )}
      onPointerEnter={() => {
        updateHighlightedTiles([x, y]);
      }}
    >
      {`${x}, ${y}`}
    </button>
  );
}
