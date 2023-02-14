import Confetti from "react-confetti";
import { createPortal } from "react-dom";
import { useGameContext } from "../../hooks/useGameContext";
import { useSocketContext } from "../../hooks/useSocketContext";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export const Result = () => {
  const { isWinner } = useGameContext();
  const { resetGame } = useSocketContext();

  return (
    <>
      {createPortal(
        <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 flex justify-center items-center">
          <div className="max-w-2xl relative bg-cyan-100 w-full m-3 py-10 px-4 rounded-xl text-slate-900">
            {isWinner && (
              <>
                <h2 className="text-5xl text-center font-semibold">You Won!</h2>
                <Text className="py-6" size="lg" theme="dark">
                  Congratulations on beating your opponent! Your strategic
                  thinking paid off, and you were able to successfully sink all
                  of their ships. Your victory is a testament to your skill and
                  perseverance. Well done!
                </Text>
              </>
            )}
            {!isWinner && (
              <>
                <h2 className="text-5xl text-center font-semibold">
                  You Lost!
                </h2>
                <Text className="py-6" size="lg" theme="dark">
                  Losing this round of Battleships may not have gone your way,
                  but don't worry, there's always the next game! Remember, it's
                  all about having fun and trying new strategies. Who knows,
                  maybe next time you'll come out on top and sink all your
                  opponent's ships!
                </Text>
              </>
            )}
            <Button callback={() => resetGame()} theme="dark">
              Play Again?
            </Button>
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
