import { ShipConstructor } from "./vite-env";

export const getHighlightedTiles = (
  coordinates: [number, number],
  length: number,
  isRotated: boolean
): [number, number][] => {
  const [x, y] = coordinates;
  const coordinate = isRotated ? x : y;

  const baseTile = coordinate - Math.round(length / 2) + 1;

  const tiles = [...Array(length)].map((e, i) => {
    return baseTile + i;
  });

  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] < 0) {
      tiles[i] = Math.max(...tiles) + 1;
    } else if (tiles[i] > 9) {
      tiles[i] = Math.min(...tiles) - 1;
    }
  }

  tiles.sort(function (a, b) {
    return a - b;
  });

  if (isRotated) {
    return tiles.map((x) => [x, y]);
  } else {
    return tiles.map((y) => [x, y]);
  }
};

export const generate2DArray = (
  n: number
): number[][] | ShipConstructor["id"][][] => {
  let array: number[][] = [];
  for (let x = 0; x < n; x++) {
    array[x] = [];
    for (let y = 0; y < n; y++) {
      array[x][y] = 0;
    }
  }
  return array;
};
