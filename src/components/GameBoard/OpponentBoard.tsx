import { useState } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { BoardCoordinates } from "./BoardCoordinates";
import { OpponentTile } from "./OpponentTile";

export const OpponentBoard = () => {
  const { opponentBoard } = useGameContext();
  const [hoverDisabled, setHoverDisabled] = useState(false);

  return (
    <div className="relative mx-auto grid grid-cols-10 w-full lg:w-max">
      {[...Array(10)].map((e, y) =>
        [...Array(10)].map((e2, x) => (
          <OpponentTile
            key={`${x} ${y}`}
            tileStatus={opponentBoard[x][y]}
            {...{ x, y, hoverDisabled, setHoverDisabled }}
          />
        ))
      )}
      <BoardCoordinates />
    </div>
  );
};
