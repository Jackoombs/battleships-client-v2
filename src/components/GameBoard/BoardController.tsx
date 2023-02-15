import { useGameContext } from "../../hooks/useGameContext";
import { MobileControls } from "../GameControl/MobileControls";
import { ShowInfoButton } from "../GameControl/ShowInfoButton";
import { TurnIndicator } from "../GameControl/TurnIndicator";
import { ResultMessage } from "../Sidebar/ResultMessage";
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
      return (
        <>
          {playerTurn ? <OpponentBoard /> : <PlayerBoard />}
          <div className="pt-4 lg:hidden flex flex-col w-full gap-3">
            <div className="w-full grid grid-cols-[5fr_1fr] gap-3 md:pt-14">
              <TurnIndicator />
              <ShowInfoButton />
            </div>
            <ResultMessage />
          </div>
        </>
      );
    }
  };

  return (
    <div className="lg:p-10 md:p-6 2xl:p-16 w-full lg:w-max md:rounded-3xl scroll">
      {renderBoard()}
    </div>
  );
};
