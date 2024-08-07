const sampleGamesetConfig = {
  pieces: [
    {
      name: "Pawn",
      symbol: "1",
      moves: [{ x: 1, y: 0, m: true, c: true }],
      maxSteps: 2,
      value: 1.625,
      maxCellsReachable: 2,
      optional: { p: true },
    },
    {
      name: "Bishop",
      symbol: "4",
      moves: [
        { x: 1, y: 1, m: true, c: true },
        { x: 1, y: -1, m: true, c: true },
        { x: -1, y: 1, m: true, c: true },
        { x: -1, y: -1, m: true, c: true },
      ],
      maxSteps: 8,
      value: 8.75,
      maxCellsReachable: 13,
      optional: {},
    },
    {
      name: "Rook",
      symbol: "r",
      moves: [
        { x: 1, y: 0, m: true, c: true },
        { x: -1, y: 0, m: true, c: true },
        { x: 0, y: 1, m: true, c: true },
        { x: 0, y: -1, m: true, c: true },
      ],
      maxSteps: 8,
      value: 14.0,
      maxCellsReachable: 14,
      optional: {},
    },
    {
      name: "Knight",
      symbol: "2",
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
      value: 5.25,
      maxCellsReachable: 8,
      optional: {},
    },
    {
      name: "Queen",
      symbol: "Q",
      moves: [
        { x: 1, y: 0, m: true, c: true },
        { x: 1, y: 1, m: true, c: true },
        { x: 0, y: 1, m: true, c: true },
        { x: -1, y: 1, m: true, c: true },
        { x: -1, y: 0, m: true, c: true },
        { x: -1, y: -1, m: true, c: true },
        { x: 0, y: -1, m: true, c: true },
        { x: 1, y: -1, m: true, c: true },
      ],
      maxSteps: 8,
      value: 22.75,
      maxCellsReachable: 27,
      optional: {},
    },
    {
      name: "King",
      symbol: "K",
      moves: [
        { x: 1, y: 0, m: true, c: true },
        { x: 1, y: 1, m: true, c: true },
        { x: 0, y: 1, m: true, c: true },
        { x: -1, y: 1, m: true, c: true },
        { x: -1, y: 0, m: true, c: true },
        { x: -1, y: -1, m: true, c: true },
        { x: 0, y: -1, m: true, c: true },
        { x: 1, y: -1, m: true, c: true },
      ],
      maxSteps: 1,
      value: 5.75,
      maxCellsReachable: 8,
      optional: { "+": true },
    },
  ],
  gameState: {
    turn: 1,
    board: [
      ["rb", "2b", "4b", "Qb", "Kb", "4b", "2b", "rb"],
      ["1b", "1b", "1b", "1b", "1b", "1b", "1b", "1b"],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ["1w", "1w", "1w", "1w", "1w", "1w", "1w", "1w"],
      ["rw", "2w", "4w", "Qw", "Kw", "4w", "2w", "rw"],
    ],
  },
  whiteCoefficients: [
    1.0725970447440374, 0.5290833037881657, 0.5915854658364857,
    109.26594499651583,
  ],
  blackCoefficients: [
    1.0725970447440374, 0.5290833037881657, 0.5915854658364857,
    109.26594499651583,
  ],
};

export default sampleGamesetConfig;
