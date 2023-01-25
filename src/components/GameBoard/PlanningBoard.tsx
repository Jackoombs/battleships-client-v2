import { useEffect, useState } from "react";
import { useShipsContext } from "../../hooks/useShipsProvider";
import { generate2DArray, getHighlightedTiles } from "../../utils";
import { ShipConstructor } from "../../vite-env";
import { MobileControls } from "../GameControl/MobileControls";
import { BoardCoordinates } from "./BoardCoordinates";
import { PlanningTile } from "./PlanningTile";

export function PlanningBoard() {
  const ships = useShipsContext();
  const activeShip = ships.getActiveShip();
  const [board, setBoard] = useState(generate2DArray(10));
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

  const checkCoordinatesValid = (coordinates: [number, number][]) => {
    for (const coord of coordinates) {
      const [x, y] = coord;
      if (typeof board[x][y] === "string") {
        return false;
      }
    }
    return true;
  };
  const areHighlightedTilesValid = checkCoordinatesValid(highlightedTiles);

  const placeShip = () => {
    const newBoard = [...board];
    if (!activeShip || !areHighlightedTilesValid) {
      return;
    }
    for (const coord of highlightedTiles) {
      const [x, y] = coord;
      newBoard[x][y] = activeShip?.id;
    }
    setBoard(newBoard);
    ships.setIsPlaced(activeShip.name, highlightedTiles);
  };

  const removeShip = (id: ShipConstructor["id"]) => {
    const newBoard = [...board];
    const ship = ships.getShipByID(id);
    const shipCoordinates = ship!.coordinates;
    for (const coord of shipCoordinates) {
      const [x, y] = coord;
      newBoard[x][y] = 0;
    }
    setBoard(newBoard);
    ships.setIsPlaced(ship!.name, []);
  };

  const handleWheel = () => {
    setHighlightOrientationIsX((state) => !state);
  };

  console.log(ships.getActiveShip());

  return (
    <>
      <div
        className="relative mx-auto grid grid-cols-10 w-full lg:w-max"
        onPointerLeave={() => setHighlightedTiles([])}
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
                areHighlightedTilesValid,
                setLastHoveredTile,
                highlightedTiles,
                placeShip,
                removeShip,
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
