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
      if (event.key === "r" || event.key === "R") {
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
    } else console.log("yua");
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

  const placeShip = () => {
    const newBoard = [...board];
    const activeShip = ships.getActiveShip();
    if (!activeShip) {
      return;
    }
    for (const coord of highlightedTiles) {
      const [x, y] = coord;
      newBoard[x][y] = activeShip?.id;
    }
    ships.setIsPlaced(activeShip.name, true);
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
              tileStatus={board[x][y]}
              {...{
                x,
                y,
                updateHighlightedTiles,
                setLastHoveredTile,
                highlightColor,
                highlightedTiles,
                placeShip,
              }}
            />
          ))
        )}
        <BoardCoordinates />
      </div>
    </>
  );
}
