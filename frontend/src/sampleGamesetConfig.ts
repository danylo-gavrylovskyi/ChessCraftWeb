import { GamesetConfig } from "./classes/Gameset";

const sampleGamesetConfig: GamesetConfig = {
  pieces: [
    {
      name: "Pawn",
      symbol: "1",
      moves: [
        { x: 0, y: 1, m: true, c: false },
        { x: 0, y: 2, m: true, c: false },
        { x: 1, y: 1, m: false, c: true },
        { x: -1, y: 1, m: false, c: true },
      ],
      maxSteps: 2,
      maxCellsReachable: 2,
      value: 1,
      optional: "p",
    },
    {
      name: "Rook",
      symbol: "R",
      moves: [
        { x: 1, y: 0, m: true, c: true },
        { x: -1, y: 0, m: true, c: true },
        { x: 0, y: 1, m: true, c: true },
        { x: 0, y: -1, m: true, c: true },
      ],
      maxSteps: 8,
      maxCellsReachable: 14,
      value: 5,
      optional: "",
    },
    {
      name: "Knight",
      symbol: "N",
      moves: [
        { x: 2, y: 1, m: true, c: true },
        { x: 2, y: -1, m: true, c: true },
        { x: -2, y: 1, m: true, c: true },
        { x: -2, y: -1, m: true, c: true },
        { x: 1, y: 2, m: true, c: true },
        { x: 1, y: -2, m: true, c: true },
        { x: -1, y: 2, m: true, c: true },
        { x: -1, y: -2, m: true, c: true },
      ],
      maxSteps: 1,
      maxCellsReachable: 8,
      value: 3,
      optional: "",
    },
    {
      name: "Bishop",
      symbol: "B",
      moves: [
        { x: 1, y: 1, m: true, c: true },
        { x: 1, y: -1, m: true, c: true },
        { x: -1, y: 1, m: true, c: true },
        { x: -1, y: -1, m: true, c: true },
      ],
      maxSteps: 8,
      maxCellsReachable: 13,
      value: 3,
      optional: "",
    },
    {
      name: "Queen",
      symbol: "Q",
      moves: [
        { x: 1, y: 0, m: true, c: true },
        { x: -1, y: 0, m: true, c: true },
        { x: 0, y: 1, m: true, c: true },
        { x: 0, y: -1, m: true, c: true },
        { x: 1, y: 1, m: true, c: true },
        { x: 1, y: -1, m: true, c: true },
        { x: -1, y: 1, m: true, c: true },
        { x: -1, y: -1, m: true, c: true },
      ],
      maxSteps: 8,
      maxCellsReachable: 27,
      value: 9,
      optional: "",
    },
    {
      name: "King",
      symbol: "K",
      moves: [
        { x: 1, y: 0, m: true, c: true },
        { x: -1, y: 0, m: true, c: true },
        { x: 0, y: 1, m: true, c: true },
        { x: 0, y: -1, m: true, c: true },
        { x: 1, y: 1, m: true, c: true },
        { x: 1, y: -1, m: true, c: true },
        { x: -1, y: 1, m: true, c: true },
        { x: -1, y: -1, m: true, c: true },
      ],
      maxSteps: 1,
      maxCellsReachable: 8,
      value: 100,
      optional: "!",
    },
  ],
  board: {
    rows: 8,
    columns: 8,
    board: Array(8)
      .fill(null)
      .map(() => Array(8).fill(null)),
  },
  white_coefficients: [1, 1, 1, 1], // Ensure this is a tuple with exactly 4 numbers
  black_coefficients: [1, 1, 1, 1], // Ensure this is a tuple with exactly 4 numbers
};

export default sampleGamesetConfig;
