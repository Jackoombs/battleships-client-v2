import { HiArrowSmRight } from "react-icons/hi";
import { useGameContext } from "../../hooks/useGameContext";
import { Text } from "../ui/Text";

interface Props {
  theme?: "light" | "dark";
}

export const Instructions = ({ theme = "light" }: Props) => {
  const { gamePhase } = useGameContext();

  return (
    <div className="flex flex-col gap-4 pb-10">
      <h2 className="text-2xl pl-4 tracking-widest font-semibold flex gap-2 items-center">
        {<HiArrowSmRight className="text-4xl" />}How to play
      </h2>
      {(gamePhase === "lobby" || gamePhase === "planning") && (
        <>
          <Text {...{ theme }} size="sm">
            Battleships is a two-player game where each player has a set of
            ships that they place on a grid. The goal of the game is to sink all
            of the opponent's ships by guessing their location on the grid.
          </Text>
          <Text {...{ theme }}>
            To start, you will need to place your ships on the grid. You have 5
            ships of various sizes, such as a destroyer (2 squares), a submarine
            (3 squares), and a battleship (4 squares). You can place your ships
            horizontally or vertically on the grid, but they cannot overlap.
          </Text>
          <Text {...{ theme }}>
            <>
              Press the <strong>R</strong> key, the{" "}
              <strong>ROTATE BUTTON</strong> on mobile, or use the{" "}
              <strong>MOUSE WHEEL</strong> to rotate your ship.
            </>
          </Text>
        </>
      )}
      {gamePhase === "battle" && (
        <>
          <Text {...{ theme }}>
            Now it's your job to try and figure out where your opponent's ships
            are hidden on the grid.
          </Text>
          <Text {...{ theme }}>
            To do this, you will click on a tile or a specific coordinate on the
            grid to make your guess. If you hit a ship, it will be marked as a
            hit on the opponent's grid, if you miss it will be marked as a miss.
          </Text>
          <Text {...{ theme }}>
            Your goal is to find and hit all of your opponent's ships before
            they hit all of yours. Good luck!
          </Text>
        </>
      )}
    </div>
  );
};
