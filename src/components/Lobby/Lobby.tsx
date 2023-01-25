import { useState } from "react";
import { CreateOrJoin } from "./CreateOrJoin";
import { Form } from "./Form";

export const Lobby = () => {
  const [createOrJoin, setCreateOrJoin] = useState<"create" | "join" | null>(
    null
  );

  return (
    <div className="w-full mt-20 lg:mt-0">
      {!createOrJoin && <CreateOrJoin {...{ setCreateOrJoin }} />}
      {createOrJoin && <Form {...{ createOrJoin, setCreateOrJoin }} />}
    </div>
  );
};
