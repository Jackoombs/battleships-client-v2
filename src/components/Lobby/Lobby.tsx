import { useState } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { useSocketContext } from "../../hooks/useSocketContext";
import { Modal } from "../ui/Modal";
import { Text } from "../ui/Text";
import { Loading } from "../ui/Loading";
import { Button } from "../ui/Button";
import { CreateOrJoin } from "./CreateOrJoin";
import { Form } from "./Form";

export const Lobby = () => {
  const { gamePhase } = useGameContext();
  const { room, disconnectFromRoom } = useSocketContext();
  const [createOrJoin, setCreateOrJoin] = useState<"create" | "join" | null>(
    null
  );

  return (
    <div className="w-full mt-20 lg:mt-0">
      {!createOrJoin && <CreateOrJoin {...{ setCreateOrJoin }} />}
      {createOrJoin && <Form {...{ createOrJoin, setCreateOrJoin }} />}
      {room && gamePhase === "lobby" && (
        <Modal callBack={() => disconnectFromRoom()}>
          <div className="flex flex-col gap-8 w-full items-center">
            <Text bold center theme="dark" size="lg">
              Waiting for opponent to join game.
            </Text>
            <p className="font-bold text-3xl">{room}</p>
            <Loading size="text-6xl" />
            <Button theme="dark" callback={() => disconnectFromRoom()}>
              Back to lobby
            </Button>
          </div>
        </Modal>
      )}
      <Text
        theme="light"
        bold
        className="container max-w-sm lg:max-w-lg mx-auto text-center pt-10 italic"
      >
        Please note that this app uses a free tier server that may take a few
        seconds to start up when first visiting the page.
      </Text>
    </div>
  );
};
