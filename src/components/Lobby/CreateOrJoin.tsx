import { Button } from "../ui/Button";

interface Props {
  setCreateOrJoin: React.Dispatch<
    React.SetStateAction<"create" | "join" | null>
  >;
}

export const CreateOrJoin = ({ setCreateOrJoin }: Props) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      <Button size="full" callback={() => setCreateOrJoin("create")}>
        Create Game
      </Button>
      <Button size="full" callback={() => setCreateOrJoin("join")}>
        Join Game
      </Button>
    </div>
  );
};
