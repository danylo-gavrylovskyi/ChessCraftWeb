import Move from "./Move";

function isValidPosition(
  row: number,
  col: number,
  rows: number,
  cols: number
): boolean {
  return 0 <= row && row < rows && 0 <= col && col < cols;
}

interface OptionalProperties {
  x: boolean; // trap
  n: boolean; // ninja
  y: boolean; // scary
  d: boolean; // demon
  l: boolean; // leader
  f: boolean; // fusion
  s: boolean; // shooter
  c: boolean; // cloning
  g: boolean; // grouping
  "+": boolean; // fortress
  p: boolean; // promotion
  v: boolean; // invisible
  e: boolean; // explosive
  i: boolean; // insatiable
  u: boolean; // unbreakable
  "?": boolean; // randomSelf
  r: boolean; // radioactive
  o: boolean; // randomOthers
  t: boolean; // timeTraveler
  a: boolean; // activeLearner
  "!": boolean; // isSpecial
}

class ChessPiece {
  name: string;
  symbol: string;
  moves: Move[];
  maxSteps: number;
  maxCellsReachable: number;
  value: number;
  optional: OptionalProperties;

  constructor(json: {
    name: string;
    symbol: string;
    moves: any[];
    maxSteps: number;
    maxCellsReachable: number;
    value: number;
    optional: OptionalProperties;
  }) {
    this.name = json.name;
    this.symbol = json.symbol;
    this.moves = json.moves.map((moveJson: any) => new Move(moveJson));
    this.maxSteps = json.maxSteps;
    this.maxCellsReachable = json.maxCellsReachable;
    this.value = json.value;
    this.optional = json.optional;
  }

  toJSON() {
    return {
      name: this.name,
      symbol: this.symbol,
      moves: this.moves.map((move) => move.toJSON()),
      maxSteps: this.maxSteps,
      maxCellsReachable: this.maxCellsReachable,
      value: this.value,
      optional: this.optional,
    };
  }

  getMoves(movesList: string[]): Move[] {
    const moves: Move[] = [];
    for (const movesString of movesList) {
      if (movesString.length === 2) {
        const x = movesString[0] === "+" ? 1 : movesString[0] === "-" ? -1 : 0;
        const y = movesString[1] === "+" ? 1 : movesString[1] === "-" ? -1 : 0;
        moves.push(new Move({ x, y, m: true, c: true }));
      } else {
        let moving = true;
        let capturing = true;
        if (!/^[+-0][+-0]$|^[+-]\d+,[+-]\d+$/.test(movesString)) {
          moving = movesString[0] === "1";
          capturing = movesString[1] === "1";
        }
        const moveTuple = movesString.slice(2).split(",").map(Number);
        moves.push(
          new Move({
            x: moveTuple[0],
            y: moveTuple[1],
            m: moving,
            c: capturing,
          })
        );
      }
    }
    return moves;
  }

  calculateReachableCells(
    position: [number, number],
    rows: number,
    columns: number
  ): number {
    const [row, column] = position;
    if (!isValidPosition(row, column, rows, columns)) {
      return 0;
    }
    let possibleMoves = 0;
    for (const move of this.moves) {
      let stepsMade = 0;
      let currentRow = row;
      let currentCol = column;
      while (stepsMade < this.maxSteps) {
        stepsMade++;
        const newRow = currentRow + move.x;
        const newCol = currentCol + move.y;
        if (!isValidPosition(newRow, newCol, rows, columns)) {
          break;
        }
        possibleMoves++;
        currentRow = newRow;
        currentCol = newCol;
      }
    }
    return possibleMoves;
  }

  calculateReachableCellsStats(rows: number, columns: number): void {
    const numsReachableCells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        numsReachableCells.push(
          this.calculateReachableCells([r, c], rows, columns)
        );
      }
    }
    this.maxCellsReachable = Math.max(...numsReachableCells);
    this.value =
      numsReachableCells.reduce((a, b) => a + b, 0) / numsReachableCells.length;
  }
}

export type { OptionalProperties };
export default ChessPiece;
