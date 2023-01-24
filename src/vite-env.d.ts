/// <reference types="vite/client" />

export interface ShipConstructor {
  name: "Carrier" | "Battleship" | "Destroyer" | "Submarine" | "Patrol Boat";
  id: "C" | "B" | "D" | "S" | "P";
  length: 5 | 4 | 3 | 2;
  color: string;
  highlightColor: string;
  isActive: boolean;
}
