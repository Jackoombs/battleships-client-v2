import { createContext, useEffect } from "react";
import { PlanningBoard } from "./components/GameBoard/PlanningBoard";
import { useShips, ShipsType } from "./hooks/useShips";
import { HiArrowSmRight } from "react-icons/hi";
import { StartGameButton } from "./components/GameControl/StartGameButton";

export const ShipsContext = createContext<ShipsType | null>(null);

function App() {
  const ships = useShips();

  return (
    <ShipsContext.Provider value={ships}>
      <div className="min-h-[100svh] bg-slate-900 font-sans lg:grid grid-cols-[auto_1fr]">
        <aside className="bg-slate-700 hidden lg:block min-w-[20rem] w-full max-w-[20rem] xl:max-w-sm 2xl:max-w-md px-4 pt-10 text-cyan-100">
          <h1 className="text-center font-semibold text-5xl pb-12">
            Battleships
          </h1>
          <div className="flex flex-col gap-4 pb-10">
            <h2 className="text-2xl pl-4 tracking-widest font-semibold flex gap-2 items-center">
              {<HiArrowSmRight className="text-4xl" />}How to play
            </h2>
            <p className="text-base">
              Battleships is a two-player game where each player has a set of
              ships that they place on a grid. The goal of the game is to sink
              all of the opponent's ships by guessing their location on the
              grid.
            </p>
            <p className="text-base">
              To start, you will need to place your ships on the grid. You have
              5 ships of various sizes, such as a destroyer (2 squares), a
              submarine (3 squares), and a battleship (4 squares). You can place
              your ships horizontally or vertically on the grid, but they cannot
              overlap.
            </p>
            <p className="text-base">
              Press the <strong>R</strong> key or use your{" "}
              <strong>Mouse Wheel</strong> to rotate your ship.
            </p>
          </div>
          <StartGameButton />
        </aside>
        <h1 className="md:hidden text-center py-10 text-5xl uppercase tracking-widest text-cyan-100">
          Battleships
        </h1>
        <main className="flex items-center justify-center max-w-[92%] mx-auto ">
          <div className="lg:p-10 md:p-6 2xl:p-16 w-full lg:w-max md:rounded-3xl lg:bg-slate-700">
            <PlanningBoard />
          </div>
        </main>
      </div>
    </ShipsContext.Provider>
  );
}

export default App;
