import { useEffect, useState } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { useShipsContext } from "../../hooks/useShipsContext";
import { getHighlightedTiles } from "../../utils";
import type { PlanningTileType } from "../../vite-env";
import { MobileControls } from "../GameControl/MobileControls";
import { BoardCoordinates } from "./BoardCoordinates";
import { PlanningTile } from "./PlanningTile";

export function PlanningBoard() {
  const ships = useShipsContext();
  const activeShip = ships.getActiveShip();
  const { planningBoard, placementIsValid, placeShip, removeShip } =
    useGameContext();
  const [highlightOrientationIsX, setHighlightOrientationIsX] = useState(false);
  const [highlightedTiles, setHighlightedTiles] = useState<[number, number][]>(
    []
  );
  const [lastHoveredTile, setLastHoveredTile] = useState<
    [number, number] | null
  >(null);
  const areHighlightedTilesValid = placementIsValid(highlightedTiles);

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
    }
  }, [highlightOrientationIsX, ships]);

  const updateHighlightedTiles = (tile: [number, number]) => {
    if (!activeShip) {
      return setHighlightedTiles([]);
    }
    const highlightedTiles = getHighlightedTiles(
      tile,
      activeShip.length,
      highlightOrientationIsX
    );
    setHighlightedTiles(highlightedTiles);
  };

  const handleWheel = () => {
    setHighlightOrientationIsX((state) => !state);
    11;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const xCoord = e.targetTouches[0].clientX;
    const yCoord = e.targetTouches[0].clientY;
    const elements = document.elementsFromPoint(xCoord, yCoord);
    const x: string | null = elements[0].getAttribute("x");
    const y: string | null = elements[0].getAttribute("y");
    if (x === null || y === null) {
      return;
    } else {
      const coords: [number, number] = [+x, +y];
      setLastHoveredTile(coords);
      updateHighlightedTiles(coords);
    }
  };

  const handleClick = (tileStatus: PlanningTileType) => {
    if (!activeShip && typeof tileStatus === "string") {
      removeShip(tileStatus);
    } else if (activeShip && areHighlightedTilesValid) {
      placeShip(activeShip.id, highlightedTiles);
    }
  };

  return (
    <>
      <div
        className="relative mx-auto grid grid-cols-10 w-full lg:w-max"
        onMouseLeave={() => setHighlightedTiles([])}
        onWheel={handleWheel}
        onTouchMove={handleTouchMove}
      >
        {[...Array(10)].map((e, y) =>
          [...Array(10)].map((e2, x) => (
            <PlanningTile
              key={`${x} ${y}`}
              tileStatus={planningBoard[x][y]}
              {...{
                x,
                y,
                updateHighlightedTiles,
                areHighlightedTilesValid,
                setLastHoveredTile,
                highlightedTiles,
                handleClick,
              }}
            />
          ))
        )}
        <BoardCoordinates />
      </div>
      <MobileControls {...{ setHighlightOrientationIsX }} />
    </>
  );
}
