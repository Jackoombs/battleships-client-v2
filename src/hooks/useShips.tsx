import { useState } from "react";
import type { Ship } from "../vite-env";

export const useShips = () => {
  const createShip = ({
    name,
    id,
    length,
    color,
    highlightColor,
    isActive,
  }: Ship) => {
    return {
      name,
      id,
      length,
      color,
      highlightColor,
      isActive,
      isPlaced: false,
    };
  };

  const [ships, setShips] = useState([
    createShip({
      name: "Carrier",
      id: "C",
      length: 5,
      color: "bg-red-400",
      highlightColor: "bg-red-600",
      isActive: true,
    }),
    createShip({
      name: "Battleship",
      id: "B",
      length: 4,
      color: "bg-orange-400",
      highlightColor: "bg-orange-600",
      isActive: false,
    }),
    createShip({
      name: "Destroyer",
      id: "D",
      length: 3,
      color: "bg-green-400",
      highlightColor: "bg-green-600",
      isActive: false,
    }),
    createShip({
      name: "Submarine",
      id: "S",
      length: 3,
      color: "bg-blue-400",
      highlightColor: "bg-blue-600",
      isActive: false,
    }),
    createShip({
      name: "Patrol Boat",
      id: "P",
      length: 2,
      color: "bg-purple-400",
      highlightColor: "bg-purple-600",
      isActive: false,
    }),
  ]);

  type ship = typeof ships[0];

  const getActiveShip = () => {
    return ships.find((ship) => ship.isActive);
  };

  const updateActiveShip = (name: ship["name"]) => {
    setShips((ships) => {
      return ships.map((ship) => {
        ship.isActive = name === ship.name ? true : false;
        return ship;
      });
    });
  };

  return {
    ships,
    getActiveShip,
    updateActiveShip,
  };
};
