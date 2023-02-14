import { useGameContext } from "../../hooks/useGameContext";
import { Text } from "../ui/Text";

export const ResultMessage = () => {
  const { roundResultMessage } = useGameContext();
  return <>{roundResultMessage && <Text>{roundResultMessage}</Text>}</>;
};
