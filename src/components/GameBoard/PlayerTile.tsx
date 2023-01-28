import type { ShipConstructor } from "../../vite-env";
import { generate2DArray } from "../../utils";
import { useShipsContext } from "../../hooks/useShipsContext";
import clsx from "clsx";

interface Props {
  x: number;
  y: number;
  tileStatus: 0 | "H" | "M" | ShipConstructor["id"];
}

export const PlayerTile = ({ x, y, tileStatus }: Props) => {
  const { getShipByID } = useShipsContext();

  const tileColor = () => {
    if (tileStatus === "H") {
      return "bg-black";
    }
    if (tileStatus === "M") {
      return "bg-transparent";
    }
    if (typeof tileStatus === "string") {
      const ship = getShipByID(tileStatus);
      return ship?.color;
    }
    return x % 2 === y % 2 ? "bg-cyan-200" : "bg-cyan-100";
  };

  return (
    <div
      className={clsx(
        "aspect-square w-full lg:w-14 xl:w-[4.5rem] border-slate-900 lg:border-slate-700 border-2 duration-100 rounded sm:rounded-lg",
        tileColor()
      )}
    ></div>
  );
};
