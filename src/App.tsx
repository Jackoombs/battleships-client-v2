import { createContext } from "react";
import { useShips, ShipsType } from "./hooks/useShips";
import { SocketType, useSocket } from "./hooks/useSocket";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { GameType, useGame } from "./hooks/useGame";
import { BoardController } from "./components/GameBoard/BoardController";
import { Lobby } from "./components/Lobby/Lobby";

export const ShipsContext = createContext<ShipsType | null>(null);
export const GameContext = createContext<GameType | null>(null);
export const SocketContext = createContext<SocketType | null>(null);

function App() {
  const ships = useShips();
  const game: GameType = useGame({ ships });
  const gamePhase = game.gamePhase;
  const socket = useSocket({ game });

  return (
    <GameContext.Provider value={game}>
      <SocketContext.Provider value={socket}>
        <ShipsContext.Provider value={ships}>
          <div className="min-h-[100svh] bg-slate-900 font-sans lg:grid grid-cols-[auto_1fr]">
            <h1 className="lg:hidden text-center py-10 text-5xl md:text-6xl uppercase tracking-widest text-cyan-100">
              Battleships
            </h1>
            <Sidebar />
            <main className="flex items-center justify-center max-w-[92%] mx-auto w-full">
              {gamePhase === "lobby" && <Lobby />}
              {gamePhase !== "lobby" && <BoardController />}
            </main>
          </div>
        </ShipsContext.Provider>
      </SocketContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
