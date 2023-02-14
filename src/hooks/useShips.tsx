import { useState } from "react";
import type { ShipConstructor, ShipId } from "../vite-env";

export const useShips = () => {
  const createShip = ({
    name,
    id,
    length,
    color,
    highlightColor,
    isActive,
  }: ShipConstructor) => {
    let coordinates: [number, number][] = [];
    let hits: [number, number][] = [];
    return {
      name,
      id,
      length,
      color,
      highlightColor,
      isActive,
      coordinates,
      hits,
    };
  };

  const [ships, setShips] = useState([
    createShip({
      name: "Carrier",
      id: "C",
      length: 5,
      color: "bg-red-500",
      highlightColor: "bg-red-400",
      isActive: true,
    }),
    createShip({
      name: "Battleship",
      id: "B",
      length: 4,
      color: "bg-orange-500",
      highlightColor: "bg-orange-400",
      isActive: false,
    }),
    createShip({
      name: "Destroyer",
      id: "D",
      length: 3,
      color: "bg-yellow-500",
      highlightColor: "bg-yellow-300",
      isActive: false,
    }),
    createShip({
      name: "Submarine",
      id: "S",
      length: 3,
      color: "bg-blue-500",
      highlightColor: "bg-blue-400",
      isActive: false,
    }),
    createShip({
      name: "Patrol Boat",
      id: "P",
      length: 2,
      color: "bg-purple-500",
      highlightColor: "bg-purple-400",
      isActive: false,
    }),
  ]);

  type Ship = typeof ships[0];

  const getActiveShip = () => {
    return ships.find((ship) => ship.isActive);
  };

  const getNotPlacedShip = (ships: Ship[]): Ship | undefined => {
    return ships.find((ship) => !ship.coordinates.length);
  };

  const getShipByID = (id: ShipId) => {
    return ships.find((ship) => ship.id === id);
  };

  const setActiveShip = (id: ShipId | undefined) => {
    setShips((ships) => {
      return ships.map((ship) => {
        ship.isActive = id === ship.id ? true : false;
        return ship;
      });
    });
  };

  const setCoordinates = (id: ShipId, coordinates: Ship["coordinates"]) => {
    const newShips = ships.map((ship) => {
      if (ship.id === id) {
        ship.coordinates = coordinates;
      }
      return ship;
    });
    setShips(ships);
    setActiveShip(getNotPlacedShip(newShips)?.id);
  };

  const areAllShipsPlaced = () => {
    for (const ship of ships) {
      if (!ship.coordinates.length) {
        return false;
      }
    }
    return true;
  };

  const updateShipOnHit = (id: ShipId, coord: [number, number]) => {
    const newShips = ships.map((ship) => {
      if (ship.id === id) {
        ship.hits.push(coord);
      }
      return ship;
    });
    setShips(newShips);
  };

  const resetShips = () => {
    setShips((ships) =>
      ships.map((ship) => {
        ship.coordinates = [];
        ship.hits = [];
        ship.isActive = ship.id === "C" ? true : false;
        return ship;
      })
    );
  };

  return {
    ships,
    getActiveShip,
    getShipByID,
    getNotPlacedShip,
    setCoordinates,
    setActiveShip,
    areAllShipsPlaced,
    updateShipOnHit,
    resetShips,
  };
};

export type ShipsType = ReturnType<typeof useShips>;
