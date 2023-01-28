/// <reference types="vite/client" />

export interface ShipConstructor {
  name: "Carrier" | "Battleship" | "Destroyer" | "Submarine" | "Patrol Boat";
  id: ShipId;
  length: 5 | 4 | 3 | 2;
  color: string;
  highlightColor: string;
  isActive: boolean;
}

export type ShipId = "C" | "B" | "D" | "S" | "P";
export type PlanningTileType = ShipId | 0;
export type PlayerTileType = ShipId | 0 | "H" | "M";
export type OpponentTileType = ShipId | 0 | "H" | "M" | "L";
