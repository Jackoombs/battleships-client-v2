import { useState } from "react";

interface Props {
  name: string;
  isActiveShip: boolean;
}
export const useShip = ({ name, isActiveShip }: Props) => {
  const [isActive, setIsActive] = useState(isActiveShip);

  return {
    name,
    isActive,
    setIsActive,
  };
};
