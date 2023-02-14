import Confetti from "react-confetti";
import { createPortal } from "react-dom";
import { useGameContext } from "../../hooks/useGameContext";
import { Text } from "../ui/Text";

export const Result = () => {
  const { isWinner } = useGameContext();

  return (
    <>
      {createPortal(
        <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 flex justify-center items-center">
          <div className="max-w-2xl relative bg-cyan-100 w-full m-3 py-10 px-4 rounded-xl text-slate-900">
            <Text theme="dark">{isWinner.toString()}</Text>
          </div>
          {isWinner && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
        </div>,
        document.body
      )}
    </>
  );
};
