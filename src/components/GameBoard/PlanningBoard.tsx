import { useEffect, useMemo, useState } from "react";
import { generate2DArray, getHighlightedTiles } from "../../utils";
import { PlanningTile } from "./PlanningTile";
import throttle from "lodash.throttle";

export function PlanningBoard() {
  const [board, setBoard] = useState(generate2DArray(10));
  const [highlightColor, setHighlightColor] = useState<string | null>(
    "bg-purple-600"
  );
  const [highlightOrientationIsX, setHighlightOrientationIsX] = useState(false);
  const [highlightedTiles, setHighlightedTiles] = useState<[number, number][]>(
    []
  );
  const [lastHoveredTile, setLastHoveredTile] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        setHighlightOrientationIsX((state) => !state);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (lastHoveredTile) {
      setHighlightedTiles(
        getHighlightedTiles(lastHoveredTile, 5, highlightOrientationIsX)
      );
    }
  }, [highlightOrientationIsX]);

  const handleWheel = () => {
    setHighlightOrientationIsX((state) => !state);
  };

  return (
    <div
      className="grid grid-cols-10 md:w-max mx-auto"
      onPointerLeave={() => setHighlightColor(null)}
      onPointerEnter={() => setHighlightColor("bg-red-600")}
      onWheel={handleWheel}
    >
      {[...Array(10)].map((e, y) =>
        [...Array(10)].map((e2, x) => (
          <PlanningTile
            key={`${x} ${y}`}
            {...{
              x,
              y,
              highlightColor,
              highlightOrientationIsX,
              highlightedTiles,
              setHighlightedTiles,
              setLastHoveredTile,
            }}
          />
        ))
      )}
    </div>
  );
}
