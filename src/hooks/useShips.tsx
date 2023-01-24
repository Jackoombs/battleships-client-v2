import { useState } from "react";
import type { ShipConstructor } from "../vite-env";

export const useShips = () => {
  const createShip = ({
    name,
    id,
    length,
    color,
    highlightColor,
    isActive,
  }: ShipConstructor) => {
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
      color: "bg-red-600",
      highlightColor: "bg-red-500",
      isActive: true,
    }),
    createShip({
      name: "Battleship",
      id: "B",
      length: 4,
      color: "bg-orange-600",
      highlightColor: "bg-orange-500",
      isActive: false,
    }),
    createShip({
      name: "Destroyer",
      id: "D",
      length: 3,
      color: "bg-slate-600",
      highlightColor: "bg-slate-500",
      isActive: false,
    }),
    createShip({
      name: "Submarine",
      id: "S",
      length: 3,
      color: "bg-blue-600",
      highlightColor: "bg-blue-500",
      isActive: false,
    }),
    createShip({
      name: "Patrol Boat",
      id: "P",
      length: 2,
      color: "bg-purple-600",
      highlightColor: "bg-purple-500",
      isActive: false,
    }),
  ]);

  type Ship = typeof ships[0];

  const getActiveShip = () => {
    return ships.find((ship) => ship.isActive);
  };

  const getNotPlacedShip = (ships: Ship[]): Ship | undefined => {
    return ships.find((ship) => !ship.isPlaced);
  };

  const getShipByID = (id: Ship["id"]) => {
    return ships.find((ship) => ship.id === id);
  };

  const setActiveShip = (name: Ship["name"] | undefined) => {
    setShips((ships) => {
      return ships.map((ship) => {
        ship.isActive = name === ship.name ? true : false;
        return ship;
      });
    });
  };

  const setIsPlaced = (
    name: Ship["name"],
    isPlaced: boolean,
    updateActive?: boolean
  ) => {
    const newShips = [...ships].map((ship) => {
      if (ship.name === name) {
        ship.isPlaced = isPlaced;
      }
      return ship;
    });
    setShips(ships);
    setActiveShip(getNotPlacedShip(newShips)?.name);
  };

  return {
    ships,
    getActiveShip,
    getShipByID,
    getNotPlacedShip,
    setIsPlaced,
  };
};

export type ShipsType = ReturnType<typeof useShips>;
