/// <reference types="vite/client" />

export interface Ship {
  name: "Carrier" | "Battleship" | "Destroyer" | "Submarine" | "Patrol Boat";
  id: "C" | "B" | "D" | "S" | "P";
  length: 5 | 4 | 3 | 2;
  color: string;
  highlightColor: string;
  isActive: boolean;
}

export interface ShipsType {
  ships: Ship[];
  getActiveShip: () => Ship | undefined;
  updateActiveShip: (name: Ship["name"]) => void;
}
