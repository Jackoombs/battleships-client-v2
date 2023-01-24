import { createContext } from "react";
import { Header } from "./components/Header/Header";
import { PlanningBoard } from "./components/GameBoard/PlanningBoard";
import { useShips, ShipsType } from "./hooks/useShips";

export const ShipsContext = createContext<ShipsType | null>(null);

function App() {
  const ships = useShips();

  return (
    <ShipsContext.Provider value={ships}>
      <div className="min-h-[100svh] bg-cyan-800 font-sans">
        <Header />
        <main>
          <div className="mx-auto max-w-container">
            <PlanningBoard />
          </div>
        </main>
      </div>
    </ShipsContext.Provider>
  );
}

export default App;
