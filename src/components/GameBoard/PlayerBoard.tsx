import { useGameContext } from "../../hooks/useGameContext";
import { BoardCoordinates } from "./BoardCoordinates";
import { PlayerTile } from "./PlayerTile";

export const PlayerBoard = () => {
  const { playerBoard } = useGameContext();

  return (
    <div className="relative mx-auto grid grid-cols-10 w-full lg:w-max">
      {[...Array(10)].map((e, y) =>
        [...Array(10)].map((e2, x) => (
          <PlayerTile
            key={`${x} ${y}`}
            tileStatus={playerBoard[x][y]}
            {...{ x, y }}
          />
        ))
      )}
      <BoardCoordinates />
    </div>
  );
};
