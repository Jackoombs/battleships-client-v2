import clsx from "clsx";
import { useState } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { useShipsContext } from "../../hooks/useShipsContext";
import { useSocketContext } from "../../hooks/useSocketContext";
import { Button } from "../ui/Button";
import { Loading } from "../ui/Loading";
import { Modal } from "../ui/Modal";
import { Text } from "../ui/Text";

export const StartGameButton = () => {
  const ships = useShipsContext();
  const { playerShipsReady, setPlayerShipsReady, checkOpponentReady } =
    useSocketContext();
  const areAllShipsPlaced = ships.areAllShipsPlaced();
  const handleClick = () => {
    if (areAllShipsPlaced) {
      setPlayerShipsReady(true);
      checkOpponentReady();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={clsx(
          "w-full mx-auto px-8 py-4 text-slate-900 rounded font-semibold text-lg uppercase tracking-widest col-span-full",
          areAllShipsPlaced
            ? "hover:text-cyan-100 hover:bg-slate-900 duration-150 bg-cyan-100"
            : "bg-gray-500 cursor-default"
        )}
      >
        Ready?
      </button>
      {playerShipsReady && (
        <Modal callBack={() => setPlayerShipsReady(false)}>
          <div className="flex flex-col gap-8 w-full items-center">
            <Text bold center theme="dark" size="lg">
              Waiting for opponent.
            </Text>
            <Loading size="text-6xl" />
            <Button theme="dark" callback={() => setPlayerShipsReady(false)}>
              Wait I'm not ready yet!
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
