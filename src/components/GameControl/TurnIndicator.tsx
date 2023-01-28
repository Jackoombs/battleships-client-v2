import clsx from "clsx";
import { BiAngry } from "react-icons/bi";
import { BiHappyBeaming } from "react-icons/bi";
import { useGameContext } from "../../hooks/useGameContext";

interface Props {
  maxWidth?: string;
  height?: string;
}

export const TurnIndicator = ({ maxWidth, height = "h-16" }: Props) => {
  const { playerTurn } = useGameContext();

  return (
    <div
      className={clsx(
        "relative bg-cyan-100 rounded mx-auto flex overflow-hidden items-center",
        maxWidth,
        height
      )}
    >
      <div
        className={clsx(
          "relative z-10 w-1/2 h-full flex items-center justify-center duration-300 text-4xl",
          playerTurn ? "text-cyan-100" : "text-slate-900"
        )}
      >
        <BiHappyBeaming />
      </div>
      <div
        className={clsx(
          "relative z-10 w-1/2 h-full flex items-center justify-center duration-300 text-4xl",
          playerTurn ? "text-slate-900" : "text-cyan-100"
        )}
      >
        <BiAngry />
      </div>
      <div
        className={clsx(
          "w-[calc(50%-12px)] h-[calc(100%-12px)] absolute  bg-slate-900 rounded-md duration-300",
          playerTurn ? "left-[6px]" : "left-[calc(50%+6px)]"
        )}
      ></div>
    </div>
  );
};
