import Move from "./Move";

function isValidPosition(
  row: number,
  col: number,
  rows: number,
  cols: number
): boolean {
  return 0 <= row && row < rows && 0 <= col && col < cols;
}

class ChessPiece {
  name: string;
  symbol: string;
  moves: Move[];
  maxSteps: number;
  maxCellsReachable: number;
  value: number;
  trap: boolean;
  ninja: boolean;
  scary: boolean;
  demon: boolean;
  leader: boolean;
  fusion: boolean;
  shooter: boolean;
  cloning: boolean;
  grouping: boolean;
  fortress: boolean;
  promotion: boolean;
  invisible: boolean;
  explosive: boolean;
  insatiable: boolean;
  unbreakable: boolean;
  randomSelf: boolean;
  radioactive: boolean;
  randomOthers: boolean;
  timeTraveler: boolean;
  activeLearner: boolean;
  isSpecial: boolean;

  constructor(json: {
    name: string;
    symbol: string;
    moves: any[];
    maxSteps: number;
    maxCellsReachable: number;
    value: number;
    optional: {
      x: boolean;
      n: boolean;
      y: boolean;
      d: boolean;
      l: boolean;
      f: boolean;
      s: boolean;
      c: boolean;
      g: boolean;
      "+": boolean;
      p: boolean;
      v: boolean;
      e: boolean;
      i: boolean;
      u: boolean;
      "?": boolean;
      r: boolean;
      o: boolean;
      t: boolean;
      a: boolean;
      "!": boolean;
    };
  }) {
    this.name = json.name;
    this.symbol = json.symbol;
    this.moves = json.moves.map(
      (moveJson: { x: number; y: number; m: boolean; c: boolean }) =>
        new Move(moveJson)
    );
    this.maxSteps = json.maxSteps;
    this.maxCellsReachable = json.maxCellsReachable;
    this.value = json.value;
    this.trap = json.optional.x || false;
    this.ninja = json.optional.n || false;
    this.scary = json.optional.y || false;
    this.demon = json.optional.d || false;
    this.leader = json.optional.l || false;
    this.fusion = json.optional.f || false;
    this.shooter = json.optional.s || false;
    this.cloning = json.optional.c || false;
    this.grouping = json.optional.g || false;
    this.fortress = json.optional["+"] || false;
    this.promotion = json.optional.p || false;
    this.invisible = json.optional.v || false;
    this.explosive = json.optional.e || false;
    this.insatiable = json.optional.i || false;
    this.unbreakable = json.optional.u || false;
    this.randomSelf = json.optional["?"] || false;
    this.radioactive = json.optional.r || false;
    this.randomOthers = json.optional.o || false;
    this.timeTraveler = json.optional.t || false;
    this.activeLearner = json.optional.a || false;
    this.isSpecial = json.optional["!"] || false;
  }

  toJSON() {
    return {
      name: this.name,
      symbol: this.symbol,
      moves: this.moves.map((move) => move.toJSON()),
      maxSteps: this.maxSteps,
      maxCellsReachable: this.maxCellsReachable,
      value: this.value,
      optional: {
        x: this.trap,
        n: this.ninja,
        y: this.scary,
        d: this.demon,
        l: this.leader,
        f: this.fusion,
        s: this.shooter,
        c: this.cloning,
        g: this.grouping,
        "+": this.fortress,
        p: this.promotion,
        v: this.invisible,
        e: this.explosive,
        i: this.insatiable,
        u: this.unbreakable,
        "?": this.randomSelf,
        r: this.radioactive,
        o: this.randomOthers,
        t: this.timeTraveler,
        a: this.activeLearner,
        "!": this.isSpecial,
      },
    };
  }

  static fromJSON(json: {
    name: string;
    symbol: string;
    moves: any[];
    maxSteps: number;
    maxCellsReachable: number;
    value: number;
    optional: {
      x: boolean;
      n: boolean;
      y: boolean;
      d: boolean;
      l: boolean;
      f: boolean;
      s: boolean;
      c: boolean;
      g: boolean;
      "+": boolean;
      p: boolean;
      v: boolean;
      e: boolean;
      i: boolean;
      u: boolean;
      "?": boolean;
      r: boolean;
      o: boolean;
      t: boolean;
      a: boolean;
      "!": boolean;
    };
  }): ChessPiece {
    return new ChessPiece(json);
  }

  getMoves(movesList: string[]): Move[] {
    const moves: Move[] = [];
    for (const movesString of movesList) {
      if (movesString.length === 2) {
        const x = movesString[0] === "+" ? 1 : movesString[0] === "-" ? -1 : 0;
        const y = movesString[1] === "+" ? 1 : movesString[1] === "-" ? -1 : 0;
        moves.push(
          new Move({
            x: x,
            y: y,
            m: true,
            c: true,
          })
        );
      } else {
        let moving = true;
        let capturing = true;
        if (!/^[+-0][+-0]$|^[+-]\d+,[+-]\d+$/.test(movesString)) {
          moving = movesString[0] == "1";
          capturing = movesString[1] == "1";
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

export default ChessPiece;
