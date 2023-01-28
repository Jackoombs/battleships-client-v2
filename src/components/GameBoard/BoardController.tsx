import { useGameContext } from "../../hooks/useGameContext";
import { OpponentBoard } from "./OpponentBoard";
import { PlanningBoard } from "./PlanningBoard";
import { PlayerBoard } from "./PlayerBoard";

export const BoardController = () => {
  const { gamePhase, playerTurn } = useGameContext();

  const renderBoard = () => {
    if (gamePhase === "planning") {
      return <PlanningBoard />;
    }
    if (gamePhase === "battle") {
      return playerTurn ? <OpponentBoard /> : <PlayerBoard />;
    }
  };

  return (
    <div className="lg:p-10 md:p-6 2xl:p-16 w-full lg:w-max md:rounded-3xl lg:bg-slate-700">
      {renderBoard()}
    </div>
  );
};
