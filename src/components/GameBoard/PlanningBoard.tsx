import { useEffect, useState } from "react";
import { useShipsContext } from "../../hooks/useShipsProvider";
import { generate2DArray, getHighlightedTiles } from "../../utils";
import { BoardCoordinates } from "./BoardCoordinates";
import { PlanningTile } from "./PlanningTile";

export function PlanningBoard() {
  const ships = useShipsContext();
  const [board, setBoard] = useState(generate2DArray(10));
  const [highlightColor, setHighlightColor] = useState<string | undefined>(
    ships.getActiveShip()?.color
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
      updateHighlightedTiles(lastHoveredTile);
    }
  }, [highlightOrientationIsX]);

  const updateHighlightedTiles = (tile: [number, number]) => {
    const activeShip = ships.getActiveShip();
    if (activeShip) {
      setHighlightedTiles(
        getHighlightedTiles(tile, activeShip.length, highlightOrientationIsX)
      );
    }
  };

  const handleWheel = () => {
    setHighlightOrientationIsX((state) => !state);
  };

  return (
    <>
      <div
        className="relative mx-auto grid grid-cols-10 md:w-max"
        onPointerLeave={() => setHighlightColor(undefined)}
        onPointerEnter={() => setHighlightColor(ships.getActiveShip()?.color)}
        onWheel={handleWheel}
      >
        {[...Array(10)].map((e, y) =>
          [...Array(10)].map((e2, x) => (
            <PlanningTile
              key={`${x} ${y}`}
              {...{
                x,
                y,
                updateHighlightedTiles,
                highlightColor,
                highlightOrientationIsX,
                highlightedTiles,
                setHighlightedTiles,
                setLastHoveredTile,
              }}
            />
          ))
        )}
        <BoardCoordinates />
      </div>
    </>
  );
}
