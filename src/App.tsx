import { Header } from "./components/Header/Header";
import { PlanningBoard } from "./components/GameBoard/PlanningBoard";
import { useShip } from "./hooks/useShip";
import { useEffect, useState } from "react";

function App() {
  const [ships, setShips] = useState([
    useShip({ name: "Cruiser", isActiveShip: true }),
    useShip({ name: "Jack", isActiveShip: false }),
    useShip({ name: "Berry", isActiveShip: false }),
    useShip({ name: "Buckle", isActiveShip: false }),
  ]);

  return (
    <div className="font-sans min-h-[100svh] bg-cyan-800">
      <Header />
      <main>
        <div className="max-w-container mx-auto">
          <PlanningBoard />
        </div>
      </main>
    </div>
  );
}

export default App;
