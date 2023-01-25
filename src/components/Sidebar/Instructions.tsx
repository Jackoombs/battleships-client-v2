import { HiArrowSmRight } from "react-icons/hi";

export const Instructions = () => {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <h2 className="text-2xl pl-4 tracking-widest font-semibold flex gap-2 items-center">
        {<HiArrowSmRight className="text-4xl" />}How to play
      </h2>
      <p className="text-base">
        Battleships is a two-player game where each player has a set of ships
        that they place on a grid. The goal of the game is to sink all of the
        opponent's ships by guessing their location on the grid.
      </p>
      <p className="text-base">
        To start, you will need to place your ships on the grid. You have 5
        ships of various sizes, such as a destroyer (2 squares), a submarine (3
        squares), and a battleship (4 squares). You can place your ships
        horizontally or vertically on the grid, but they cannot overlap.
      </p>
      <p className="text-base">
        Press the <strong>R</strong> key, the <strong>ROTATE BUTTON</strong> on
        mobile, or use the <strong>MOUSE WHEEL</strong> to rotate your ship.
      </p>
    </div>
  );
};
