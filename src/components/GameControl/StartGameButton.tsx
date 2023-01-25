import clsx from "clsx";
import { useShipsContext } from "../../hooks/useShipsProvider";

export const StartGameButton = () => {
  const ships = useShipsContext();
  const areAllShipsPlaced = ships.areAllShipsPlaced();

  console.log(ships.areAllShipsPlaced());

  return (
    <button
      className={clsx(
        "w-full mx-auto px-8 py-4 text-slate-900 rounded font-semibold text-lg uppercase tracking-widest",
        areAllShipsPlaced
          ? "hover:text-cyan-100 hover:bg-slate-900 duration-150 bg-cyan-100"
          : "bg-gray-500 cursor-default"
      )}
    >
      Ready?
    </button>
  );
};
