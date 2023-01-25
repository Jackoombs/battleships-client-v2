import { useGameContext } from "../../hooks/useGameProvider";
import { PlanningBoard } from "./PlanningBoard";

export const BoardController = () => {
  const game = useGameContext();
  const gamePhase = game.gamePhase;

  return (
    <div className="lg:p-10 md:p-6 2xl:p-16 w-full lg:w-max md:rounded-3xl lg:bg-slate-700">
      {gamePhase === "planning" && <PlanningBoard />}
    </div>
  );
};
