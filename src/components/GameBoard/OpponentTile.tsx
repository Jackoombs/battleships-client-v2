import clsx from "clsx";
import { useGameContext } from "../../hooks/useGameContext";
import { Loading } from "../ui/Loading";

interface Props {
  x: number;
  y: number;
  tileStatus: 0 | "H" | "M" | "L";
  hoverDisabled: boolean;
  setHoverDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OpponentTile = ({
  x,
  y,
  tileStatus,
  hoverDisabled,
  setHoverDisabled,
}: Props) => {
  const { setTileLoading } = useGameContext();

  const tileColor = () => {
    return x % 2 === y % 2 ? "bg-cyan-200" : "bg-cyan-100";
  };

  const hoverStyle = () => {
    if (tileStatus === 0 && !hoverDisabled) {
      return "hover:bg-transparent cursor-pointer";
    }
  };

  const handleClick = () => {
    if (tileStatus === 0 && !hoverDisabled) {
      setTileLoading([x, y]);
      setHoverDisabled(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "aspect-square w-full lg:w-14 xl:w-[4.5rem] border-slate-900 lg:border-slate-700 border-2 duration-100 rounded sm:rounded-lg flex items-center justify-center",
        tileColor(),
        hoverStyle()
      )}
    >
      {tileStatus === "L" && <Loading size="text-6xl" />}
    </div>
  );
};
