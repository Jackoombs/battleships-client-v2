import { clsx } from "clsx";
import { useEffect } from "react";
import { getHighlightedTiles } from "../../utils";

interface Props {
  x: number;
  y: number;
  highlightColor: string | null;
  highlightOrientationIsX: boolean;
  highlightedTiles: [number, number][];
  setHighlightedTiles: React.Dispatch<React.SetStateAction<[number, number][]>>;
  setLastHoveredTile: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
}

export function PlanningTile({
  x,
  y,
  highlightColor,
  highlightOrientationIsX,
  highlightedTiles,
  setHighlightedTiles,
  setLastHoveredTile,
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
    return x % 2 === y % 2 ? "bg-cyan-200" : "bg-cyan-400";
  };

  return (
    <button
      data-x={x}
      data-y={y}
      className={clsx(
        "aspect-square w-full md:w-14 lg:w-16 border-cyan-800 border md:border-2 duration-100 rounded md:rounded-lg",
        isHighlighted(highlightedTiles, [x, y])
          ? highlightColor
          : tileColor(x, y)
      )}
      onPointerEnter={() => {
        setHighlightedTiles(
          getHighlightedTiles([x, y], 5, highlightOrientationIsX)
        );
        setLastHoveredTile([x, y]);
      }}
    >
      {`${x}, ${y}`}
    </button>
  );
}
